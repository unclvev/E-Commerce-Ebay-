import { Button, Popconfirm, Space, Table, message } from 'antd';
import axios from 'axios'; // Import axios để gọi API
import dayjs from 'dayjs'; // Import dayjs để định dạng thời gian
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ManageProducts = () => {
    const [dataSource, setDataSource] = useState([]);  // Khai báo state để lưu trữ dữ liệu sản phẩm
    const [loading, setLoading] = useState(true);  // Khai báo state để xử lý trạng thái tải dữ liệu

    // Lấy dữ liệu sản phẩm từ API
    useEffect(() => {
        axios.get('http://localhost:5133/api/ProductManagement/listings')
            .then((response) => {
                console.log('Product data:', response.data);
                // Chuyển dữ liệu thành định dạng phù hợp cho bảng
                const products = response.data.map(item => ({
                    key: item.productId,  // Sử dụng productId làm key cho từng dòng
                    name: `Product ${item.productId}`,  // Giả sử tên sản phẩm là "Product + productId"
                    price: `$${item.currentPrice.toFixed(2)}`,  // Định dạng giá sản phẩm
                    stock: item.startPrice === item.currentPrice ? 'In Stock' : 'Out of Stock',  // Kiểm tra tình trạng tồn kho
                    startTime: dayjs(item.startTime).format('YYYY-MM-DD HH:mm:ss'),  // Định dạng startTime
                    endTime: dayjs(item.endTime).format('YYYY-MM-DD HH:mm:ss'),  // Định dạng endTime
                }));
                setDataSource(products);  // Lưu dữ liệu vào state
                setLoading(false);  // Dừng trạng thái tải
            })
            .catch((error) => {
                message.error('Error loading products');
                setLoading(false);  // Dừng trạng thái tải khi có lỗi
            });
    }, []);  // useEffect chỉ chạy 1 lần khi component được render

    const columns = [
        { title: 'Product Name', dataIndex: 'name', key: 'name' },
        { title: 'Price', dataIndex: 'price', key: 'price' },
        { title: 'Stock', dataIndex: 'stock', key: 'stock' },
        { title: 'Start Time', dataIndex: 'startTime', key: 'startTime' },  // Cột startTime
        { title: 'End Time', dataIndex: 'endTime', key: 'endTime' },  // Cột endTime
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
                <div className="text-xl font-semibold">Seller Dashboard</div>
                <div className="space-x-4">
                    <Link to="/seller/order">
                        <Button type="default">Manage Orders</Button>
                    </Link>
                    <Link to="/seller/dashboard">
                        <Button type="default">Dashboard</Button>
                    </Link>
                    <Link to="/seller/Promotion">
                        <Button>Promotions </Button>
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

            <Table
                dataSource={dataSource}  // Dữ liệu từ API
                columns={columns}
                loading={loading}  // Hiển thị spinner khi đang tải dữ liệu
                rowKey="key"   // Dùng productId làm khóa cho từng dòng
            />
        </div>
    );
};

export default ManageProducts;
