import { Button, Form, Input, message, Modal, Table } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import SellerNavbar from './layout/SellerNavbar';

const Promotion = () => {
    const [promotions, setPromotions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        fetchPromotions();
    }, []);

    const fetchPromotions = async () => {
        try {
            const response = await axios.get('http://localhost:5134/api/PromotionManagement');
            const formattedPromotions = response.data.map((item) => ({
                key: item.id,
                id: item.id,
                prValue: item.prValue * 100, // Convert to percentage
                prDescription: item.prDescription,
                productId: item.productId,
            }));
            setPromotions(formattedPromotions);
            setLoading(false);
        } catch (error) {
            message.error('Error loading promotions');
            setLoading(false);
        }
    };

    const handleDiscountChange = (value, key) => {
        const updatedPromotions = promotions.map((promotion) =>
            promotion.key === key ? { ...promotion, prValue: value } : promotion
        );
        setPromotions(updatedPromotions);
    };

    const applyDiscount = async (record) => {
        try {
            const response = await axios.get(`http://localhost:5134/api/ProductManagement/listing/product/${record.productId}`);
            const product = response.data;
            const discountedPrice = product.currentPrice * (1 - record.prValue / 100);
            alert(`New price after ${record.prValue}% discount: $${discountedPrice.toFixed(2)}`);


            await axios.put(`http://localhost:5134/api/ProductManagement/listings/${product.id}`, {
                id: product.id,
                productId: product.productId,
                sellerId: product.sellerId,
                startTime: product.startTime,
                endTime: product.endTime,
                startPrice: product.startPrice,
                currentPrice: discountedPrice,
                categoryId: product.categoryId
            });
            message.success('Price updated successfully');
            // Cập nhật lại danh sách promotion
            setPromotions(promotions.map(promo =>
                promo.key === record.key ? { ...promo, currentPrice: discountedPrice } : promo
            ));
        } catch (error) {
            message.error('Failed to update listing with new price');
        }
    };

    const showAddPromotionModal = () => {
        setIsModalVisible(true);
    };

    const handleAddPromotion = async (values) => {
        try {
            const newPromotion = {
                id: '',
                prValue: values.prValue / 100, // Convert back to decimal
                prDescription: values.prDescription,
                productId: values.productId,
            };
            await axios.post('http://localhost:5134/api/PromotionManagement', newPromotion);
            message.success('Promotion added successfully');
            setIsModalVisible(false);
            form.resetFields();
            fetchPromotions();
        } catch (error) {
            message.error('Failed to add promotion');
        }
    };

    const handleDeletePromotion = async (id) => {
        try {
            await axios.delete(`http://localhost:5134/api/PromotionManagement/${id}`);
            message.success('Promotion deleted successfully');
            setPromotions(promotions.filter((promo) => promo.id !== id));
        } catch (error) {
            message.error('Failed to delete promotion');
        }
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
                <div className="flex space-x-2">
                    <Button type="primary" onClick={() => applyDiscount(record)}>
                        Apply Discount
                    </Button>
                    <Button type="danger" onClick={() => handleDeletePromotion(record.id)}>
                        Delete
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <div className="p-6">
            <SellerNavbar />
            <Button type="primary" className="mb-4" onClick={showAddPromotionModal}>Add New Promotion</Button>
            <Table dataSource={promotions} columns={columns} loading={loading} />

            <Modal
                title="Add New Promotion"
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
            >
                <Form form={form} onFinish={handleAddPromotion}>
                    <Form.Item label="Discount (%)" name="prValue" rules={[{ required: true, message: 'Please enter a discount value' }]}>
                        <Input type="number" min={0} max={100} placeholder="Enter discount percentage" />
                    </Form.Item>
                    <Form.Item label="Description" name="prDescription" rules={[{ required: true, message: 'Please enter a description' }]}>
                        <Input placeholder="Enter promotion description" />
                    </Form.Item>
                    <Form.Item label="Product ID" name="productId" rules={[{ required: true, message: 'Please enter the product ID' }]}>
                        <Input placeholder="Enter product ID" />
                    </Form.Item>
                    <div className="flex justify-end space-x-4">
                        <Button onClick={() => setIsModalVisible(false)}>Cancel</Button>
                        <Button type="primary" htmlType="submit">Add Promotion</Button>
                    </div>
                </Form>
            </Modal>
        </div>
    );
};

export default Promotion;
