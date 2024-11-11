import { Button, Popconfirm, Space, Table, message } from 'antd';
import axios from 'axios';
import dayjs from 'dayjs';
import { jwtDecode } from 'jwt-decode';
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
    const [userId, setUserId] = useState(null);

    // Lấy danh sách sản phẩm từ API
    useEffect(() => {
        const token = localStorage.getItem('jwt');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                const email = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"];

                // Gọi API chỉ khi user.email đã có giá trị
                if (email) {
                    axios.get(`http://localhost:5191/email/${email}`)
                        .then((response) => {
                            console.log("UserId response:", response.data);
                            setUserId(response.data);  // Lưu userId vào state
                            setLoading(false);  // Dừng trạng thái tải
                        })
                        .catch((error) => {
                            message.error('Error loading user data');
                            setLoading(false);  // Dừng trạng thái tải khi có lỗi
                        });
                }
            } catch (error) {
                console.error("Invalid JWT", error);
            }
        }
    }, []);
    useEffect(() => {
        if (userId) {
            fetchProducts();
        }
    }, [userId]);
    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:5134/api/ProductManagement/listings/${userId}`);
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
                userId={userId}
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
