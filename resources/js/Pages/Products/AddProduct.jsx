// ProductAdd.js
import React, { useState } from 'react';
import {Head} from "@inertiajs/react";
import Guest from "@/Layouts/GuestLayout.jsx";
import AddProductForm from "@/Pages/Products/AddProductForm.jsx";
import NavLink from "@/Components/NavLink.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";

const ProductAdd = () => {

    return (
        <Guest
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Add Product</h2>}
        >
            <Head title="Add Product"/>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <h1>Product List</h1>
                        <NavLink href={route('products.index')}>
                            <PrimaryButton>Back</PrimaryButton>
                        </NavLink>
                        <AddProductForm/>
                    </div>
                </div>
            </div>

        </Guest>
    );
};

export default ProductAdd;
