import { Button, Input, Table, message } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Promotion = () => {
    const [promotions, setPromotions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:5133/api/PromotionManagement')
            .then((response) => {
                console.log('Promotion data:', response.data);
                const formattedPromotions = response.data.map((item) => ({
                    key: item.id,
                    id: item.id,
                    prValue: item.prValue * 100, // Chuyển thành phần trăm
                    prDescription: item.prDescription,
                    productId: item.productId,
                }));
                setPromotions(formattedPromotions);
                setLoading(false);
            })
            .catch((error) => {
                message.error('Error loading promotions');
                setLoading(false);
            });
    }, []);

    const handleDiscountChange = (value, key) => {
        const updatedPromotions = promotions.map((promotion) =>
            promotion.key === key ? { ...promotion, prValue: value } : promotion
        );
        setPromotions(updatedPromotions);
    };

    const applyDiscount = (record) => {
        const discountedPrice = record.price - (record.price * record.prValue) / 100;
        alert(`New price after ${record.prValue}% discount: $${discountedPrice.toFixed(2)}`);
    };

    const columns = [
        { title: 'Product ID', dataIndex: 'productId', key: 'productId' },
        { title: 'Discount (%)', dataIndex: 'prValue', key: 'prValue', render: (value) => `${value}%` },
        { title: 'Description', dataIndex: 'prDescription', key: 'prDescription' },
        {
            title: 'Adjust Discount (%)',
            key: 'adjustDiscount',
            render: (_, record) => (
                <Input
                    type="number"
                    min={0}
                    max={100}
                    value={record.prValue}
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
            <div className="flex justify-between items-center mb-6 bg-gray-100 p-4 rounded-lg shadow">
                <div className="text-xl font-semibold">Seller Dashboard</div>
                <div className="space-x-4">
                    <Link to="/seller/product">
                        <Button type="default">Manage Products</Button>
                    </Link>
                    <Link to="/seller/order">
                        <Button type="default">Manage Orders</Button>
                    </Link>
                    <Link to="/seller/dashboard">
                        <Button type="default">Dashboard</Button>
                    </Link>
                </div>
            </div>
            <Button type="primary" className="mb-4">Add New Promotion</Button>
            <Table dataSource={promotions} columns={columns} loading={loading} />
        </div>
    );
};

export default Promotion;
