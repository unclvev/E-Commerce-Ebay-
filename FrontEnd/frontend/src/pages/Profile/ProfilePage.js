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

  const fetchUserProfile = async () => {
    if (!userId) {
      message.error('User ID không hợp lệ.');
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5191/api/User/${userId}`);
      if (response.status === 200) {
        setUser(response.data);
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

  const handleUpdateProfile = async (values) => {
    try {
      const response = await axios.put(`http://localhost:5191/api/User/edit/${userId}`, values);
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

  return (
    <div className="profile-page" style={{ padding: '20px', backgroundColor: '#f0f2f5' }}>
      <Card
        title="Hồ Sơ Người Dùng"
        style={{
          maxWidth: '600px',
          margin: 'auto',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          borderRadius: '8px',
          overflow: 'hidden'
        }}
        headStyle={{ backgroundColor: '#001529', color: '#fff', textAlign: 'center' }}
      >
        {editMode ? (
          <Form
            initialValues={user}
            onFinish={handleUpdateProfile}
            layout="vertical"
            style={{ padding: '20px' }}
          >
            <Form.Item
              label="Tên"
              name="firstName"
              rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Họ"
              name="lastName"
              rules={[{ required: true, message: 'Vui lòng nhập họ!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Địa chỉ"
              name="address"
              rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Số điện thoại"
              name="phoneNumber"
              rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Vui lòng nhập email!', type: 'email' }]}
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
          <div style={{ textAlign: 'center', fontSize: '16px', color: '#555' }}>
            <p><strong>Tên:</strong> {user.firstName}</p>
            <p><strong>Họ:</strong> {user.lastName}</p>
            <p><strong>Địa chỉ:</strong> {user.address}</p>
            <p><strong>Số điện thoại:</strong> {user.phoneNumber}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <Button
              type="primary"
              onClick={() => setEditMode(true)}
              style={{ marginBottom: '10px', borderRadius: '5px' }}
            >
              Chỉnh sửa Hồ Sơ
            </Button>
            <br />
            <Link to={`/change-password/${userId}`} style={{ color: '#001529' }}>
              Đổi mật khẩu
            </Link>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ProfilePage;
