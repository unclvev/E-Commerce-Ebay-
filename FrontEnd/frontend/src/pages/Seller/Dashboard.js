import { Button, Col, Row, Statistic, Table } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

const SellerDashboard = () => {
    const dataSource = [
        { key: '1', name: 'Product A', price: '$100', stock: '10' },
        { key: '2', name: 'Product B', price: '$200', stock: '5' },
    ];

    const columns = [
        { title: 'Product Name', dataIndex: 'name', key: 'name' },
        { title: 'Price', dataIndex: 'price', key: 'price' },
        { title: 'Stock', dataIndex: 'stock', key: 'stock' },
    ];

    return (
        <div className="p-4">
            {/* Thanh điều hướng cho seller */}
            <div className="flex justify-between items-center mb-6 bg-gray-100 p-4 rounded-lg shadow">
                <div className="text-xl font-semibold">Seller Dashboard</div>
                <div className="space-x-4">
                    <Link to="/seller/products">
                        <Button type="primary">Manage Products</Button>
                    </Link>
                    <Link to="/seller/orders">
                        <Button>Manage Orders</Button>
                    </Link>
                    <Link to="/seller/account">
                        <Button>Account Settings</Button>
                    </Link>
                </div>
            </div>

            {/* Thông tin thống kê cho seller */}
            <Row gutter={16}>
                <Col span={8}>
                    <Statistic title="Total Sales" value={1128} />
                </Col>
                <Col span={8}>
                    <Statistic title="Orders" value={93} />
                </Col>
                <Col span={8}>
                    <Statistic title="Products" value={27} />
                </Col>
            </Row>

            {/* Bảng sản phẩm */}
            <div className="mt-6">
                <Button type="primary">Add Product</Button>
                <Table className="mt-4" dataSource={dataSource} columns={columns} />
            </div>
        </div>
    );
};

export default SellerDashboard;
