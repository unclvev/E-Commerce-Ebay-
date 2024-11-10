import { Button, DatePicker, Form, Input, message, Modal } from 'antd';
import axios from 'axios';
import dayjs from 'dayjs';
import React, { useEffect } from 'react';

const EditListingModal = ({ visible, onClose, listing, onUpdate }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (listing) {
            form.setFieldsValue({
                startTime: dayjs(listing.startTime),
                endTime: dayjs(listing.endTime),
                startPrice: listing.startPrice,
                currentPrice: listing.currentPrice,
                categoryId: listing.categoryId,
            });
        }
    }, [listing, form]);

    const handleSubmit = async (values) => {
        try {
            // Merge listing's id, productId, and sellerId with form values
            const updatedValues = {
                ...values,
                id: listing.id,
                productId: listing.productId,
                sellerId: listing.sellerId,
            };

            await axios.put(`http://localhost:5134/api/ProductManagement/listings/${listing.id}`, updatedValues);
            message.success('Listing updated successfully');
            onUpdate();
            onClose();
        } catch (error) {
            message.error('Failed to update listing');
        }
    };


    return (
        <Modal
            title="Edit Listing"
            visible={visible}
            onCancel={onClose}
            footer={null}
        >
            {listing ? (
                <Form
                    form={form}
                    onFinish={handleSubmit}
                >
                    <Form.Item label="Start Time" name="startTime" rules={[{ required: true }]}>
                        <DatePicker showTime />
                    </Form.Item>
                    <Form.Item label="End Time" name="endTime" rules={[{ required: true }]}>
                        <DatePicker showTime />
                    </Form.Item>
                    <Form.Item label="Start Price" name="startPrice" rules={[{ required: true }]}>
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item label="Current Price" name="currentPrice" rules={[{ required: true }]}>
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item label="Category" name="categoryId" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <div className="flex justify-end space-x-4">
                        <Button onClick={onClose}>Cancel</Button>
                        <Button type="primary" htmlType="submit">Save</Button>
                    </div>
                </Form>
            ) : (
                <div>Loading...</div>
            )}
        </Modal>
    );
};

export default EditListingModal;
