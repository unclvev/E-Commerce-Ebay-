import { Col, Row, Statistic, Table, message } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import SellerNavbar from './layout/SellerNavbar';

const SellerDashboard = () => {
    const [productCount, setProductCount] = useState(0);  // Số lượng sản phẩm
    const [orderCount, setOrderCount] = useState(0);  // Số lượng đơn hàng
    const [revenue, setRevenue] = useState(0);  // Tổng doanh thu
    const [promotionCount, setPromotionCount] = useState(0);  // Số lượng promotions
    const [dataSource, setDataSource] = useState([]);  // Danh sách sản phẩm
    const [loading, setLoading] = useState(true);  // Trạng thái tải

    // Lấy số lượng sản phẩm, đơn hàng và promotions từ API
    useEffect(() => {
        // Lấy số lượng sản phẩm
        axios.get('http://localhost:5134/api/ProductManagement/listings')
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

        // Lấy số lượng đơn hàng và tính doanh thu
        axios.get('http://localhost:5134/api/OrderManagement/orders')
            .then((response) => {
                setOrderCount(response.data.length);  // Cập nhật số lượng đơn hàng

                // Tính doanh thu cho các đơn hàng có trạng thái Delivered
                const deliveredOrders = response.data.filter(order => order.orderStatus === 'Delivered');
                const totalRevenue = deliveredOrders.reduce((total, order) => {
                    return total + order.totalAmount;  // Tổng doanh thu từ các đơn hàng Delivered
                }, 0);
                setRevenue(totalRevenue.toFixed(2));  // Cập nhật doanh thu (Revenue)
            })
            .catch((error) => {
                message.error('Error loading orders');
            });

        // Lấy số lượng promotions
        axios.get('http://localhost:5134/api/PromotionManagement')
            .then((response) => {
                setPromotionCount(response.data.length);  // Cập nhật số lượng promotions
            })
            .catch((error) => {
                message.error('Error loading promotions');
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
            <SellerNavbar />

            {/* Thống kê - Đặt tất cả trong một dòng */}
            <Row gutter={16}>
                <Col span={6}>
                    <Statistic title="Revenue" value={`$${revenue}`} />  {/* Hiển thị doanh thu */}
                </Col>
                <Col span={6}>
                    <Statistic title="Orders" value={orderCount} />
                </Col>
                <Col span={6}>
                    <Statistic title="Products" value={productCount} />
                </Col>
                <Col span={6}>
                    <Statistic title="Promotions" value={promotionCount} />  {/* Hiển thị số lượng promotions */}
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
