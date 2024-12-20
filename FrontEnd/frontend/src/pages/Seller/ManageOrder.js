import { Button, Table, Tag, message } from 'antd';
import axios from 'axios'; // Import axios để gọi API
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SellerNavbar from './layout/SellerNavbar';

const ManageOrder = () => {
    const [orders, setOrders] = useState([]);  // Khai báo state để lưu trữ đơn hàng
    const [loading, setLoading] = useState(true);  // Khai báo state để xử lý trạng thái tải dữ liệu

    // Lấy dữ liệu đơn hàng từ API
    useEffect(() => {
        // Thực hiện request API để lấy dữ liệu đơn hàng
        axios.get('http://localhost:5134/api/OrderManagement/orders')  // Thay đường dẫn với API của bạn
            .then((response) => {
                console.log("", response.data);
                setOrders(response.data);  // Lưu dữ liệu vào state orders
                setLoading(false);  // Dừng trạng thái tải
            })
            .catch((error) => {
                message.error('Error loading orders');
                setLoading(false);  // Dừng trạng thái tải khi có lỗi
            });
    }, []);  // useEffect sẽ chạy một lần khi component được render

    const columns = [
        { title: 'Order ID', dataIndex: 'id', key: 'id' },
        { title: 'Customer ID', dataIndex: 'userId', key: 'userId' },
        {
            title: 'Order Date',
            dataIndex: 'orderDate',
            key: 'orderDate',
            render: (date) => new Date(date).toLocaleDateString(),  // Hiển thị định dạng ngày
        },
        { title: 'Shipping Address', dataIndex: 'shippingAddress', key: 'shippingAddress' },
        {
            title: 'Total Amount',
            dataIndex: 'totalAmount',
            key: 'totalAmount',
            render: (amount) => `$${amount}`,  // Hiển thị tổng tiền
        },
        {
            title: 'Order Status',
            dataIndex: 'orderStatus',  // Thay đổi trường để hiển thị trạng thái đơn hàng
            key: 'orderStatus',
            render: (orderStatus) => {
                let color;
                switch (orderStatus) {
                    case 'Pending':
                        color = 'yellow';
                        break;
                    case 'Shipping':
                        color = 'orange';
                        break;
                    case 'Delivered':
                        color = 'green';
                        break;
                    default:
                        color = 'gray';
                }
                return <Tag color={color}>{orderStatus}</Tag>;  // Hiển thị trạng thái với màu tương ứng
            },
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <div className="space-x-2">
                    <Link to={`/seller/order/${record.id}`}> {/* Điều hướng tới trang OrderDetail với OrderId */}
                        <Button type="primary">View</Button>
                    </Link>
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
            {/* <div className="flex justify-between items-center mb-6 bg-gray-100 p-4 rounded-lg shadow">
                <div className="text-xl font-semibold">Seller Dashboard</div>
                <div className="space-x-4">
                    <Link to="/seller/product">
                        <Button type="default">Manage Products</Button>
                    </Link>
                    <Link to="/seller/dashboard">
                        <Button type="default">Dashboard</Button>
                    </Link>
                    <Link to="/seller/Promotion">
                        <Button>Promotions </Button>
                    </Link>
                </div>
            </div> */}
            <SellerNavbar />

            {/* Order Table */}
            {/* <Button type="primary" className="mb-4">Add Order</Button> */}
            <Table
                dataSource={orders}  // Dữ liệu từ API
                columns={columns}
                loading={loading}  // Hiển thị spinner khi đang tải dữ liệu
                rowKey="id"   // Dùng orderID làm khóa cho từng dòng
            />
        </div>
    );
};

export default ManageOrder;
