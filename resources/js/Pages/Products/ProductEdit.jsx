// ProductDetailPage.js

import React, { useState, useEffect } from 'react';
import ProductImage from './ProductImage';
import ProductInfo from './ProductInfo';
import { Head } from "@inertiajs/react";
import Guest from "@/Layouts/GuestLayout.jsx";
import ProductList from "@/Pages/Products/ProductList.jsx";

const ProductDetailPage = ({ product, recentlyViewed, cartCount }) => {
    return (
        <Guest
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Product Detail</h2>}
            cartCount={cartCount}
        >
            <Head title="Profile"/>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        {!product ? (
                            <p>Loading...</p>
                        ) : (
                            <div className="flex">
                                <div className="w-1/2">
                                    <ProductImage imageUrl={product.image}/>
                                </div>
                                <div className="w-1/2 mt-2">
                                    <ProductInfo product={product}/>
                                </div>
                            </div>
                        )}

                    </div>
                    <div className="mt-5">
                        <h2 className="font-semibold text-xl text-gray-800 leading-tight">Recent View</h2>
                        <ProductList products={recentlyViewed}/>
                    </div>
                </div>
            </div>
        </Guest>
    );
};

export default ProductDetailPage;
