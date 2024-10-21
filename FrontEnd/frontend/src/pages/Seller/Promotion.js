import { Button, Input, Table } from 'antd';
import React, { useState } from 'react';

const Promotion = () => {
    // Sample product data
    const [products, setProducts] = useState([
        { key: '1', name: 'Product A', price: 100, discount: 0 },
        { key: '2', name: 'Product B', price: 200, discount: 0 },
    ]);

    // Handle discount change
    const handleDiscountChange = (value, key) => {
        const updatedProducts = products.map((product) =>
            product.key === key ? { ...product, discount: value } : product
        );
        setProducts(updatedProducts);
    };

    const applyDiscount = (record) => {
        const discountedPrice = record.price - (record.price * record.discount) / 100;
        alert(`New price for ${record.name}: $${discountedPrice.toFixed(2)}`);
    };

    const columns = [
        { title: 'Product Name', dataIndex: 'name', key: 'name' },
        { title: 'Original Price', dataIndex: 'price', key: 'price', render: (price) => `$${price}` },
        {
            title: 'Discount (%)',
            dataIndex: 'discount',
            key: 'discount',
            render: (_, record) => (
                <Input
                    type="number"
                    min={0}
                    max={100}
                    value={record.discount}
                    onChange={(e) => handleDiscountChange(Number(e.target.value), record.key)}
                />
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Button type="primary" onClick={() => applyDiscount(record)}>
                    Apply Discount
                </Button>
            ),
        },
    ];

    return (
        <div className="p-6">
            {/* Page Header */}
            <div className="flex justify-between items-center mb-6 bg-gray-100 p-4 rounded-lg shadow">
                <div className="text-xl font-semibold">Manage Promotions</div>
                <Button type="primary">Add New Promotion</Button>
            </div>

            {/* Product Table */}
            <Table dataSource={products} columns={columns} />
        </div>
    );
};

export default Promotion;
