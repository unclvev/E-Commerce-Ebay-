import { Button, Popconfirm, Space, Table, message } from 'antd';
import axios from 'axios';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import AddListingModal from './include/AddListingModal'; // Import modal thêm listing
import EditListingModal from './include/EditListingModal'; // Import modal chỉnh sửa listing
import SellerNavbar from './layout/SellerNavbar';

const ManageProducts = () => {
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);  // Chế độ chỉnh sửa
    const [currentListing, setCurrentListing] = useState(null);  // Dữ liệu chi tiết của listing

    // Lấy danh sách sản phẩm từ API
    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:5134/api/ProductManagement/listings');
            const listings = response.data.map(item => ({
                key: item.id,  // Sử dụng listingId làm key
                name: `Product ${item.productId}`,
                price: `$${item.currentPrice.toFixed(2)}`,
                stock: item.startPrice === item.currentPrice ? 'No discount' : 'Discount',
                startTime: dayjs(item.startTime).format('YYYY-MM-DD HH:mm:ss'),
                endTime: dayjs(item.endTime).format('YYYY-MM-DD HH:mm:ss'),
            }));
            setDataSource(listings);
        } catch (error) {
            message.error('Error loading products');
        } finally {
            setLoading(false);
        }
    };

    const columns = [
        { title: 'Product Name', dataIndex: 'name', key: 'name' },
        { title: 'Price', dataIndex: 'price', key: 'price' },
        { title: 'Discount status', dataIndex: 'stock', key: 'stock' },
        { title: 'Start Time', dataIndex: 'startTime', key: 'startTime' },
        { title: 'End Time', dataIndex: 'endTime', key: 'endTime' },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button onClick={() => handleEdit(record.key)}>Edit</Button>
                    <Popconfirm
                        title="Are you sure to delete this listing?"
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

    const handleDelete = async (listingId) => {
        try {
            await axios.delete(`http://localhost:5134/api/ProductManagement/listings/${listingId}`);
            setDataSource(dataSource.filter(item => item.key !== listingId));
            message.success('Listing deleted successfully');
        } catch (error) {
            message.error('Failed to delete listing');
        }
    };

    const handleEdit = async (listingId) => {
        setIsEditMode(true);
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:5134/api/ProductManagement/listing/${listingId}`);
            setCurrentListing(response.data);
            setIsModalVisible(true);
        } catch (error) {
            message.error('Failed to load listing details');
        } finally {
            setLoading(false);
        }
    };

    const showAddListingModal = () => {
        setIsEditMode(false);
        setCurrentListing(null);
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
        fetchProducts();
    };

    return (
        <div className="p-4">
            {/* <div className="flex justify-between items-center mb-6 bg-gray-100 p-4 rounded-lg shadow">
                <div className="text-xl font-semibold">Seller Dashboard</div>
                <div className="space-x-4">
                    <Link to="/seller/order"><Button type="default">Manage Orders</Button></Link>
                    <Link to="/seller/dashboard"><Button type="default">Dashboard</Button></Link>
                    <Link to="/seller/Promotion"><Button>Promotions</Button></Link>
                </div>
            </div> */}
            <SellerNavbar />

            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Product List</h2>
                <Button type="primary" onClick={showAddListingModal}>Add New Product</Button>
            </div>

            <Table
                dataSource={dataSource}
                columns={columns}
                loading={loading}
                rowKey="key"
            />

            {/* Modal để thêm hoặc chỉnh sửa sản phẩm */}
            <AddListingModal
                visible={isModalVisible && !isEditMode}
                onClose={closeModal}
                isEditMode={false}
                onSave={fetchProducts}
            />
            <EditListingModal
                visible={isModalVisible && isEditMode}
                onClose={closeModal}
                listing={currentListing}
                onUpdate={fetchProducts}
            />
        </div>
    );
};

export default ManageProducts;
