<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Models\Product;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $productList = Product::all();
        return Inertia::render('Products/List', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'products' => $productList,
        ]);
    }
    /**
     * Display a listing of the resource.
     */
    public function list(Request $request)
    {
        $sortBy = $request->input('sprtyBy');
        $productList = Product::query();
        switch ($sortBy) {
            case 'A-Z':
                $productList->orderBy('name');
                break;
            case 'Z-A':
                $productList->orderBy('name', 'desc');
                break;
            case 'Low to High Price':
                $productList->orderBy('our_price');
                break;
            case 'High to Low Price':
                $productList->orderBy('our_price', 'desc');
                break;
            default:
                $productList->orderBy('id', 'desc');
                break;
        }
        $productList = $productList->get();
        return response()->json(['data'=>$productList],200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Products/AddProduct');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request)
    {
        if ($request->file('productImage')->isValid()) {
            $imageName = time().'.'.$request->file('productImage')->getClientOriginalExtension();
            $request->file('productImage')->move(public_path('/uploads'),$imageName); // Save file to 'uploads' directory

        }else{
            $imageName = '';
        }
        $product = new Product();
        $product->name = $request->productName;
        $product->image = '/uploads/'.$imageName;
        $product->sku = $request->sku;
        $product->description = $request->description;
        $product->retail_price = $request->retailPrice;
        $product->our_price = $request->ourPrice;
        if ($product->save()){
            return response()->json(['message'=>'Product Added Successfully!'],200);
        }
        return response()->json(['message'=>'Server Error'],422);
    }

    /**
     * Display the specified resource.
     */
    public function show($productId)
    {
        $recentlyViewed = Session::get('recently_viewed', []);
        return view('product.show', [
            'productId' => $productId,
            'recentlyViewed' => $recentlyViewed,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($productId)
    {

        $productDetail = Product::find($productId);
        if ($productDetail){
            $view_count = isset($productDetail->view_count) && $productDetail->view_count?$productDetail->view_count:0;
            $productDetail->view_count = (integer)$view_count + 1;
            $productDetail->save();
            $recentlyViewed = Session::get('recently_viewed', []);

            $recentlyViewProduct = Product::orderBy('view_count','DESC')->get();
            $cartList = Session::get('cart', []);
            $sum = 0;
            // Iterate through each item and sum their quantities
            foreach ($cartList as $item) {
                $sum += $item['quantity'];
            }

            return Inertia::render('Products/ProductEdit', [
                'product' => $productDetail,
                'recentlyViewed' => $recentlyViewProduct,
                'cartCount' =>$sum
            ]);
        }
        return Inertia::render('Products/AddProduct');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        //
    }
}
