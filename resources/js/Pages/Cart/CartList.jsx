// ProductInfo.js

import React from 'react';
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import NavLink from "@/Components/NavLink.jsx";
import {Table} from "react-bootstrap";

const CartList = ({ cartList }) => {
    return (
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>Product id</th>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Retail Price</th>
                <th>Our Price</th>
            </tr>
            </thead>
            <tbody>
            {(cartList ?? []).map(cart => (
                <tr key={cart.id} className="gap-2">
                    <td>{cart?.id ?? ''}</td>
                    <td>{cart.products?.name}</td>
                    <td>{cart.quantity}</td>
                    <td>{cart.products?.retail_price}</td>
                    <td>{cart.products?.our_price}</td>
                </tr>
            ))}
            </tbody>
        </Table>
    );
};

export default CartList;
