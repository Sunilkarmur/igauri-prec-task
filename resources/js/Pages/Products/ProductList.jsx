// ProductInfo.js

import React from 'react';
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import NavLink from "@/Components/NavLink.jsx";
import {Table} from "react-bootstrap";

const ProductList = ({ products }) => {
    return (
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>Product Name</th>
                <th>SKU</th>
                <th>Description</th>
                <th>Retail Price</th>
                <th>Our Price</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {products.map(product => (
                <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>{product.sku}</td>
                    <td>{product.description}</td>
                    <td>{product.retail_price}</td>
                    <td>{product.our_price}</td>
                    <td>
                        <NavLink href={`products/${product.id}`} className="btn btn-primary mr-2">
                            <PrimaryButton>View</PrimaryButton>
                        </NavLink>
                    </td>
                </tr>
            ))}
            </tbody>
        </Table>
    );
};

export default ProductList;
