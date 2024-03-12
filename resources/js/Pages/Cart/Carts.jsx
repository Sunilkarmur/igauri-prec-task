// ProductList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import {Table} from "react-bootstrap";
import {Head} from "@inertiajs/react";
import Guest from "@/Layouts/GuestLayout.jsx";
import NavLink from "@/Components/NavLink.jsx";
import ProductList from "@/Pages/Products/ProductList.jsx";
import CartList from "@/Pages/Cart/CartList.jsx";

const CartListMain = () => {

    const [cartList, setCartList] = useState([]);

    useEffect(() => {
        fetchCarts();
    }, []);

    const fetchCarts = async () => {
        const response = await axios.get(route('cart.show'));

        setCartList(response.data?.cart ?? []);
    };
    console.log(cartList, "response")
    return (
        <Guest
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Carts List</h2>}
        >
            <Head title="Profile"/>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <CartList cartList={cartList} />
                    </div>
                </div>
            </div>

        </Guest>
    );
};

export default CartListMain;
