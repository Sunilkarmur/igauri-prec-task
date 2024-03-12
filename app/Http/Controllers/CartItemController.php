<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCartItemRequest;
use App\Http\Requests\UpdateCartItemRequest;
use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;
use function MongoDB\BSON\toJSON;

class CartItemController extends Controller
{
    public function index()
    {
        return Inertia::render('Cart/Carts');
    }
    public function addItem(Request $request)
    {
        $productId = $request->input('product_id');

        $quantity = $request->input('quantity', 1);

        $cart = Session::get('cart', []);
        $collection = collect($cart);
        $exists = $collection->contains('id', $productId);
        if ($exists) {
            $collection->transform(function ($item) use ($productId) {
                if ($item['id'] === $productId) {
                    $item['quantity']++;
                }
                return $item;
            });

        } else {
            $product = Product::find($productId);
            if ($product){
                $collection->push([
                    'id' => $productId,
                    'quantity' => 1,
                    'products' => $product
                ]);
            }
        }

        Session::put('cart', $collection->all());
        $cartList = Session::get('cart', []);
        $sum = 0;
        // Iterate through each item and sum their quantities
        foreach ($cartList as $item) {
            $sum += $item['quantity'];
        }

        return response()->json(['success'=> 'Item added to cart successfully','cartCount' =>$sum],200);
    }

    public function showCart()
    {
        $cart = Session::get('cart', []);
        return response()->json(['cart'=> $cart],200);
    }
}
