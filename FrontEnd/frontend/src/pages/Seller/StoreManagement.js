import { Button, Table, Tabs } from 'antd';
import React from 'react';

const { TabPane } = Tabs;

const StoreManagement = () => {
    // Sample data for products and orders
    const productData = [
        { key: '1', name: 'Product A', price: '$100', stock: '10' },
        { key: '2', name: 'Product B', price: '$200', stock: '5' },
    ];

    const orderData = [
        { key: '1', orderID: '12345', customer: 'John Doe', total: '$250.00', date: '2024-10-01' },
        { key: '2', orderID: '12346', customer: 'Jane Smith', total: '$100.00', date: '2024-10-02' },
    ];

    // Define columns for products and orders tables
    const productColumns = [
        { title: 'Product Name', dataIndex: 'name', key: 'name' },
        { title: 'Price', dataIndex: 'price', key: 'price' },
        { title: 'Stock', dataIndex: 'stock', key: 'stock' },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <div className="space-x-2">
                    <Button type="link">Edit</Button>
                    <Button type="link" danger>
                        Delete
                    </Button>
                </div>
            ),
        },
    ];

    const orderColumns = [
        { title: 'Order ID', dataIndex: 'orderID', key: 'orderID' },
        { title: 'Customer', dataIndex: 'customer', key: 'customer' },
        { title: 'Date', dataIndex: 'date', key: 'date' },
        { title: 'Total', dataIndex: 'total', key: 'total' },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <div className="space-x-2">
                    <Button type="link">View</Button>
                    <Button type="link" danger>
                        Cancel
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6 bg-gray-100 p-4 rounded-lg shadow">
                <div className="text-xl font-semibold">Store Management</div>
                <Button type="primary">Add New Product</Button>
            </div>

            {/* Tabs for managing products, orders, etc. */}
            <Tabs defaultActiveKey="1">
                <TabPane tab="Products" key="1">
                    <div className="mt-4">
                        <Table dataSource={productData} columns={productColumns} />
                    </div>
                </TabPane>
                <TabPane tab="Orders" key="2">
                    <div className="mt-4">
                        <Table dataSource={orderData} columns={orderColumns} />
                    </div>
                </TabPane>
                <TabPane tab="Categories" key="3">
                    {/* Category management content can be added here */}
                    <div className="mt-4">
                        <Button type="primary" className="mb-4">
                            Add New Category
                        </Button>
                        {/* Category content can go here */}
                        <div className="text-gray-500">Category management coming soon...</div>
                    </div>
                </TabPane>
            </Tabs>
        </div>
    );
};

export default StoreManagement;
