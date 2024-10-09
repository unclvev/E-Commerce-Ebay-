import { Button, Table, Tag } from 'antd';
import React from 'react';

const ManageOrder = () => {
    const dataSource = [
        {
            key: '1',
            orderID: '12345',
            customer: 'John Doe',
            status: 'Delivered',
            total: '$250.00',
            date: '2024-10-01',
        },
        {
            key: '2',
            orderID: '12346',
            customer: 'Jane Smith',
            status: 'Pending',
            total: '$100.00',
            date: '2024-10-02',
        },
    ];

    const columns = [
        { title: 'Order ID', dataIndex: 'orderID', key: 'orderID' },
        { title: 'Customer', dataIndex: 'customer', key: 'customer' },
        { title: 'Date', dataIndex: 'date', key: 'date' },
        { title: 'Total', dataIndex: 'total', key: 'total' },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Tag color={status === 'Delivered' ? 'green' : 'orange'}>
                    {status}
                </Tag>
            ),
        },
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
        <div className="p-4">
            {/* Heading */}
            <div className="flex justify-between items-center mb-6 bg-gray-100 p-4 rounded-lg shadow">
                <div className="text-xl font-semibold">Manage Orders</div>
                <Button type="primary">Add Order</Button>
            </div>

            {/* Order Table */}
            <Table dataSource={dataSource} columns={columns} />
        </div>
    );
};

export default ManageOrder;
