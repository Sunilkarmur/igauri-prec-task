// ProductList.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import { Table } from "react-bootstrap";
import { Head } from "@inertiajs/react";
import Guest from "@/Layouts/GuestLayout.jsx";
import NavLink from "@/Components/NavLink.jsx";
import ProductList from "@/Pages/Products/ProductList.jsx";
import Dropdown from "@/Components/Dropdown.jsx";
import {useParams} from "react-router-dom";

const ProductListMain = () => {
    const [products, setProducts] = useState([]);
    const queryParams = new URLSearchParams(window.location.search);
    const sortKey = queryParams.get('sprtyBy');

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);

        // Get a specific query parameter value
        const paramValue = queryParams.get('sprtyBy');
        fetchProducts(paramValue);
    }, []);

    const fetchProducts = async (paramValue) => {
        let query = '';
        if(paramValue){
            query += `?sprtyBy=${paramValue}`;
        }
        const response = await axios.get(`/products/list?${query}`);
        setProducts(response.data?.data ?? []);
    };

    return (
        <Guest
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Product List
                </h2>
            }
        >
            <Head title="Profile" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow-sm sm:rounded-lg">
                        <h1>Product List</h1>
                        <div>
                            <Dropdown>
                                <Dropdown.Trigger>Sort By ({sortKey?sortKey:''})</Dropdown.Trigger>
                                <Dropdown.Content>
                                    <Dropdown.Link href='/products?sprtyBy=A-Z'>A-Z</Dropdown.Link>
                                    <Dropdown.Link href='/products?sprtyBy=Z-A'>Z-A</Dropdown.Link>
                                    <Dropdown.Link href='/products?sprtyBy=Low to High Price'>Low to High Price</Dropdown.Link>
                                    <Dropdown.Link href='/products?sprtyBy=High to Low Price'>High to Low Price</Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                        <NavLink href={route("products.create")}>
                            <PrimaryButton>Add Product</PrimaryButton>
                        </NavLink>

                        <ProductList products={products}/>
                    </div>
                </div>
            </div>
        </Guest>
    );
};

export default ProductListMain;
