import { Col, Row, Statistic, Table, message } from 'antd';
import axios from 'axios'; // Import axios để gọi API
import React, { useEffect, useState } from 'react';
import SellerNavbar from './layout/SellerNavbar';

const SellerDashboard = () => {
    const [productCount, setProductCount] = useState(0);  // Số lượng sản phẩm
    const [orderCount, setOrderCount] = useState(0);  // Số lượng đơn hàng
    const [dataSource, setDataSource] = useState([]);  // Danh sách sản phẩm
    const [loading, setLoading] = useState(true);  // Trạng thái tải

    // Lấy số lượng sản phẩm và đơn hàng từ API
    useEffect(() => {
        // Lấy số lượng sản phẩm
        axios.get('http://localhost:5133/api/ProductManagement/listings')
            .then((response) => {
                setProductCount(response.data.length);  // Cập nhật số lượng sản phẩm
                setDataSource(response.data.map(item => ({
                    key: item.productId,
                    name: `Product ${item.productId}`,
                    price: `$${item.currentPrice.toFixed(2)}`,
                    stock: item.startPrice === item.currentPrice ? 'In Stock' : 'Out of Stock',
                })));
            })
            .catch((error) => {
                message.error('Error loading products');
            });

        // Lấy số lượng đơn hàng
        axios.get('http://localhost:5133/api/OrderManagement/orders')
            .then((response) => {
                setOrderCount(response.data.length);  // Cập nhật số lượng đơn hàng
            })
            .catch((error) => {
                message.error('Error loading orders');
            });

        setLoading(false);
    }, []);  // useEffect chạy một lần khi component mount

    const columns = [
        { title: 'Product Name', dataIndex: 'name', key: 'name' },
        { title: 'Price', dataIndex: 'price', key: 'price' },
        { title: 'Stock', dataIndex: 'stock', key: 'stock' },
    ];

    return (
        <div className="p-4">
            {/* Thanh điều hướng cho seller */}
            {/* <div className="flex justify-between items-center mb-6 bg-gray-100 p-4 rounded-lg shadow">
                <div className="text-xl font-semibold">Seller Dashboard</div>
                <div className="space-x-4">
                    <Link to="/seller/product">
                        <Button>Manage Products</Button>
                    </Link>
                    <Link to="/seller/order">
                        <Button>Manage Orders</Button>
                    </Link>
                    <Link to="/seller/Promotion">
                        <Button>Promotions</Button>
                    </Link>
                </div>
            </div> */}
            <SellerNavbar />

            {/* Thống kê */}
            <Row gutter={16}>
                <Col span={8}>
                    <Statistic title="Total Sales" value={1128} />
                </Col>
                <Col span={8}>
                    <Statistic title="Orders" value={orderCount} />
                </Col>
                <Col span={8}>
                    <Statistic title="Products" value={productCount} />
                </Col>
            </Row>

            {/* Bảng sản phẩm */}
            <div className="mt-6">
                <Table
                    className="mt-4"
                    dataSource={dataSource}
                    columns={columns}
                    loading={loading}
                />
            </div>
        </div>
    );
};

export default SellerDashboard;
