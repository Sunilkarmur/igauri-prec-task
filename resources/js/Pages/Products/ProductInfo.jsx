// ProductInfo.js

import React from 'react';
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import axios from 'axios';

const ProductInfo = ({ product }) => {
    const handleAddToCart = async () => {
        axios.post(route('cart.add'),{
            product_id: product.id,
            quantity: 1
        })
            .then((response)=>{
                alert(response.data.success)
                window.location.reload()
            })
            .catch((error)=>{
                console.log(error)
            })
    }
    return (
        <div className="product-info">
            <h2>{product.name}</h2>
            <div className="price-container">
                <p className="price">{product.retail_price}</p>
                {product.our_price && (
                    <p className="discounted-price">{product.our_price}</p>
                )}
            </div>
            <p className="description">{product.description}</p>
            {/* Add to Cart button */}
            <PrimaryButton onClick={handleAddToCart}>Add to Cart</PrimaryButton>
        </div>
    );
};

export default ProductInfo;
