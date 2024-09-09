// src/components/ProductCard.js
import React from 'react';

const ProductCard = ({ name, price, image }) => {
    return (
        <div className="border border-gray-200 p-4 rounded-lg text-center w-48">
            <img src={image} alt={name} className="w-full h-32 object-cover rounded-md mb-2" />
            <h3 className="text-lg font-semibold mb-1">{name}</h3>
            <p className="text-gray-700">${price}</p>
        </div>
    );
};

export default ProductCard;
