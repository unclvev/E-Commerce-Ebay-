import React from 'react';
import { useParams } from 'react-router-dom';

function ProductDetailPage() {
    const { id } = useParams();

    // Lấy thông tin sản phẩm theo id từ API hoặc state
    const product = { id, name: 'Product 1', price: 100, description: 'Product description' };

    return (
        <div>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <p>${product.price}</p>
        </div>
    );
}

export default ProductDetailPage;
