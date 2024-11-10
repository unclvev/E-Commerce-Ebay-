import { Button, Card, Form, Input, message } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const ProfilePage = () => {
  const { userId } = useParams();
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    address: '',
    phoneNumber: '',
    email: ''
  });
  const [editMode, setEditMode] = useState(false);
  const [form] = Form.useForm();

  // Hàm tải thông tin người dùng từ API
  const fetchUserProfile = async () => {
    if (!userId) {
      message.error('User ID không hợp lệ.');
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5191/api/User/${userId}`);
      if (response.status === 200) {
        setUser(response.data);
        form.setFieldsValue(response.data); // Cập nhật dữ liệu vào Form
      } else {
        message.error('Không tìm thấy hồ sơ người dùng.');
      }
    } catch (error) {
      console.error('Lỗi khi tải hồ sơ người dùng:', error);
      message.error('Lỗi khi tải hồ sơ người dùng. Vui lòng thử lại sau.');
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, [userId]);

  // Hàm cập nhật hồ sơ người dùng
  const handleUpdateProfile = async (values) => {
    try {
      const response = await axios.put(`http://localhost:5191/api/User/edit/${userId}, values`);
      if (response.data && response.data.message) {
        message.success(response.data.message);
      }
      setEditMode(false);
      fetchUserProfile();
    } catch (error) {
      console.error('Lỗi khi cập nhật hồ sơ:', error);
      message.error('Lỗi khi cập nhật hồ sơ. Vui lòng thử lại.');
    }
  };

  // Hàm để bật chế độ chỉnh sửa và thiết lập giá trị ban đầu của form
  const enableEditMode = () => {
    setEditMode(true);
    form.setFieldsValue(user);
  };

  return (
    <>
      <div style={{ padding: '40px 0', backgroundColor: '#f5f7fa', minHeight: 'calc(100vh - 130px)', display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '100%' }}>
          <Card
            title="Hồ Sơ Người Dùng"
            style={{
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              borderRadius: '10px',
              padding: '20px',
            }}
            headStyle={{ backgroundColor: '#3b5998', color: '#fff', textAlign: 'center' }}
          >
            {editMode ? (
              <Form
                form={form}
                onFinish={handleUpdateProfile}
                layout="vertical"
                style={{ padding: '0 20px' }}
              >
                <Form.Item label="Tên" name="firstName" rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}>
                  <Input />
                </Form.Item>
                <Form.Item label="Họ" name="lastName" rules={[{ required: true, message: 'Vui lòng nhập họ!' }]}>
                  <Input />
                </Form.Item>
                <Form.Item label="Địa chỉ" name="address" rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}>
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Số điện thoại"
                  name="phoneNumber"
                  rules={[
                    { required: true, message: 'Vui lòng nhập số điện thoại!' },
                    { pattern: /^[0-9]{10,11}$/, message: 'Số điện thoại không hợp lệ, vui lòng nhập lại!' },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: 'Vui lòng nhập email!' },
                    { type: 'email', message: 'Email không hợp lệ!' },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" style={{ marginRight: '10px' }}>
                    Lưu
                  </Button>
                  <Button onClick={() => setEditMode(false)}>Hủy</Button>
                </Form.Item>
              </Form>
            ) : (
              <Form
                form={form}
                initialValues={user}
                layout="vertical"
                style={{ padding: '0 20px' }}
              >
                <Form.Item label="Tên" name="firstName">
                  <Input disabled />
                </Form.Item>
                <Form.Item label="Họ" name="lastName">
                  <Input disabled />
                </Form.Item>
                <Form.Item label="Địa chỉ" name="address">
                  <Input disabled />
                </Form.Item>
                <Form.Item label="Số điện thoại" name="phoneNumber">
                  <Input disabled />
                </Form.Item>
                <Form.Item label="Email" name="email">
                  <Input disabled />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" onClick={enableEditMode} style={{ marginRight: '10px' }}>
                    Chỉnh sửa Hồ Sơ
                  </Button>
                  <br />
                  <Link to={`/change-password/${userId}`} style={{ color: '#3b5998' }}>Đổi mật khẩu</Link>
                </Form.Item>
              </Form>
            )}
          </Card>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;

