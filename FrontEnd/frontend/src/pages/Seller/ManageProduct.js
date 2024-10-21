import { Button, Popconfirm, Space, Table, message } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ManageProducts = () => {
    const [dataSource, setDataSource] = useState([
        { key: '1', name: 'Product A', price: '$100', stock: '10' },
        { key: '2', name: 'Product B', price: '$200', stock: '5' },
    ]);

    const columns = [
        { title: 'Product Name', dataIndex: 'name', key: 'name' },
        { title: 'Price', dataIndex: 'price', key: 'price' },
        { title: 'Stock', dataIndex: 'stock', key: 'stock' },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Link to={`/seller/edit-product/${record.key}`}>
                        <Button>Edit</Button>
                    </Link>
                    <Popconfirm
                        title="Are you sure to delete this product?"
                        onConfirm={() => handleDelete(record.key)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="danger">Delete</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const handleDelete = (key) => {
        setDataSource(dataSource.filter((item) => item.key !== key));
        message.success('Product deleted successfully');
    };

    return (
        <div className="p-4">
            {/* Thanh điều hướng trang */}
            <div className="flex justify-between items-center mb-6 bg-gray-100 p-4 rounded-lg shadow">
                <div className="text-xl font-semibold">Manage Products</div>
                <div className="space-x-4">
                    <Link to="/seller/orders">
                        <Button type="default">Manage Orders</Button>
                    </Link>
                    <Link to="/seller/account">
                        <Button type="default">Account Settings</Button>
                    </Link>
                    <Link to="/seller">
                        <Button type="default">Dashboard</Button>
                    </Link>
                </div>
            </div>

            {/* Bảng sản phẩm */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Product List</h2>
                <Link to="/seller/add-product">
                    <Button type="primary">Add New Product</Button>
                </Link>
            </div>

            <Table dataSource={dataSource} columns={columns} />
        </div>
    );
};

export default ManageProducts;
