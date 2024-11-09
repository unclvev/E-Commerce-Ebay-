import { Button, Form, Input, message, Select, Table } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const OrderDetail = () => {
    const { orderId } = useParams();
    const navigate = useNavigate();

    const [orderDetails, setOrderDetails] = useState({
        id: '',
        userId: '',
        orderDate: '',
        shippingAddress: '',
        totalAmount: 0,
    });
    const [orderItems, setOrderItems] = useState([]);
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(true);

    // Hàm lấy dữ liệu đơn hàng và OrderItems từ API
    const fetchOrderData = () => {
        setLoading(true);

        // Lấy dữ liệu đơn hàng
        axios.get(`http://localhost:5133/api/OrderManagement/orders/${orderId}`)
            .then(response => {
                setOrderDetails(response.data);
            })
            .catch(() => {
                message.error('Failed to load order details.');
            });

        // Lấy dữ liệu OrderItems
        axios.get(`http://localhost:5133/api/OrderManagement/orders/${orderId}/items`)
            .then(response => {
                setOrderItems(response.data);
                setLoading(false);
            })
            .catch(() => {
                message.error('Failed to load order items.');
                setLoading(false);
            });
    };

    // useEffect gọi fetchOrderData khi trang được load
    useEffect(() => {
        fetchOrderData();
    }, [orderId]);

    const handleEditStatus = () => {
        let updatedOrder = { ...orderDetails };

        if (status === 'Shipping') {
            updatedOrder.totalAmount = null;
        } else if (status === 'Delivered') {
            updatedOrder.shippingAddress = null;
        }

        axios.put(`http://localhost:5133/api/OrderManagement/orders/${orderId}`, updatedOrder)
            .then(() => {
                message.success('Order status updated successfully');
                navigate('/seller/order');
            })
            .catch(() => {
                message.error('Failed to update order status');
            });
    };

    const handleRevertOrder = () => {
        axios.put(`http://localhost:5133/api/OrderManagement/revertorders/${orderId}`, orderDetails)
            .then(() => {
                message.success('Order reverted successfully');
                // Gọi lại fetchOrderData để cập nhật lại dữ liệu sau khi revert
                fetchOrderData();
            })
            .catch(() => {
                message.error('Failed to revert order');
            });
    };

    const columns = [
        { title: 'Product ID', dataIndex: 'productId', key: 'productId' },
        { title: 'Quantity', dataIndex: 'quantity', key: 'quantity' },
        { title: 'Price', dataIndex: 'price', key: 'price' },
    ];

    return (
        <div className="p-6 max-w-3xl mx-auto bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Order Details</h2>

            <Table
                dataSource={orderItems}
                columns={columns}
                rowKey="id"
                pagination={false}
                className="mb-8"
            />

            <Form layout="vertical" initialValues={orderDetails} className="space-y-4">
                <Form.Item label="Order ID">
                    <Input value={orderDetails.id} disabled className="border-gray-300" />
                </Form.Item>
                <Form.Item label="Order Date">
                    <Input value={orderDetails.orderDate} disabled className="border-gray-300" />
                </Form.Item>
                <Form.Item label="Shipping Address">
                    <Input
                        value={orderDetails.shippingAddress || 'No Address'}
                        disabled
                        className="border-gray-300"
                    />
                </Form.Item>
                <Form.Item label="Total Amount">
                    <Input
                        value={orderDetails.totalAmount || 'No Amount'}
                        disabled
                        className="border-gray-300"
                    />
                </Form.Item>
                <Form.Item label="Order Status">
                    <Select
                        value={status}
                        onChange={setStatus}
                        placeholder="Select Order Status"
                        className="w-full"
                    >
                        <Select.Option value="Shipping">Shipping (Paid)</Select.Option>
                        <Select.Option value="Delivered">Delivered</Select.Option>
                        <Select.Option value="Pending">Pending</Select.Option>
                    </Select>
                </Form.Item>

                <div className="flex justify-between">
                    <Button
                        type="primary"
                        onClick={handleEditStatus}
                        loading={loading}
                        className="bg-blue-500 border-blue-500"
                    >
                        Edit Status
                    </Button>
                    <Button
                        type="default"
                        onClick={handleRevertOrder}
                        className="bg-gray-300 border-gray-300 text-gray-700"
                    >
                        Revert
                    </Button>
                    <Link to="/seller/order">
                        <Button type="default" className="bg-gray-300 border-gray-300 text-gray-700">
                            Back
                        </Button>
                    </Link>
                </div>
            </Form>
        </div>
    );
};

export default OrderDetail;
