import { Button, DatePicker, Form, Input, InputNumber, Modal } from 'antd';
import axios from 'axios';
import React from 'react';

const AddListingModal = ({ visible, onClose, userId }) => {
    const [form] = Form.useForm();

    const handleAddListing = async (values) => {
        const listingData = {
            sellerListing: {
                id: "", // Hoặc một giá trị cụ thể nếu cần
                productId: "", // Bạn có thể để trống hoặc tự động tạo nếu cần thiết
                sellerId: userId,
                startTime: values.startTime.toISOString(),
                endTime: values.endTime.toISOString(),
                startPrice: values.startPrice,
                currentPrice: values.currentPrice,
                categoryId: values.categoryId,
            },
            product: {
                id: "", // Hoặc một giá trị cụ thể nếu cần
                name: values.productName,
                description: values.productDescription,
                price: values.productPrice,
                originalPrice: values.originalPrice,
                saleStartDate: values.saleStartDate.toISOString(),
                saleEndDate: values.saleEndDate.toISOString(),
                stockQuantity: values.stockQuantity,
            },
        };

        try {
            const response = await axios.post('http://localhost:5134/api/ProductManagement/listings', listingData);
            console.log('Listing added successfully:', response.data);
            onClose();
            form.resetFields();
        } catch (error) {
            console.error('Failed to add listing:', error);
            console.error('Error details:', error.response?.data);
        }
    };


    return (
        <Modal
            visible={visible}
            title="Add New Listing"
            onCancel={onClose}
            footer={null}
        >
            <Form form={form} layout="vertical" onFinish={handleAddListing} initialValues={{ sellerId: userId }}>
                <h3>Listing Information</h3>
                <Form.Item label="Seller ID" name="sellerId" rules={[{ required: true }]}>
                    <Input value={userId} disabled="true" ></Input>
                </Form.Item>
                <Form.Item label="Start Time" name="startTime" rules={[{ required: true }]}>
                    <DatePicker showTime />
                </Form.Item>
                <Form.Item label="End Time" name="endTime" rules={[{ required: true }]}>
                    <DatePicker showTime />
                </Form.Item>
                <Form.Item label="Start Price" name="startPrice" rules={[{ required: true }]}>
                    <InputNumber min={0} />
                </Form.Item>
                <Form.Item label="Current Price" name="currentPrice" rules={[{ required: true }]}>
                    <InputNumber min={0} />
                </Form.Item>
                <Form.Item label="Category ID" name="categoryId" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>

                <h3>Product Information</h3>
                <Form.Item label="Product Name" name="productName" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Product Description" name="productDescription" rules={[{ required: true }]}>
                    <Input.TextArea />
                </Form.Item>
                <Form.Item label="Product Price" name="productPrice" rules={[{ required: true }]}>
                    <InputNumber min={0} />
                </Form.Item>
                <Form.Item label="Original Price" name="originalPrice" rules={[{ required: true }]}>
                    <InputNumber min={0} />
                </Form.Item>
                <Form.Item label="Sale Start Date" name="saleStartDate" rules={[{ required: true }]}>
                    <DatePicker showTime />
                </Form.Item>
                <Form.Item label="Sale End Date" name="saleEndDate" rules={[{ required: true }]}>
                    <DatePicker showTime />
                </Form.Item>
                <Form.Item label="Stock Quantity" name="stockQuantity" rules={[{ required: true }]}>
                    <InputNumber min={0} />
                </Form.Item>

                <Button type="primary" htmlType="submit">
                    Add Listing
                </Button>
            </Form>
        </Modal>
    );
};

export default AddListingModal;