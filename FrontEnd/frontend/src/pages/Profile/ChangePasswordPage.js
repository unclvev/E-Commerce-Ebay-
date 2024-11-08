import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Form, Input, Button, message as antdMessage } from 'antd';

const ChangePasswordPage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: ''
  });

  // Xử lý khi người dùng gửi yêu cầu thay đổi mật khẩu
  const handleChangePassword = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5191/api/User/change-password/${userId}`,
        passwordData
      );
      if (response.data && response.data.message) {
        antdMessage.success(response.data.message); // Thông báo thành công
        navigate(`/profile/${userId}`);
      }
    } catch (error) {
      console.error('Lỗi khi thay đổi mật khẩu:', error);
      antdMessage.error('Lỗi khi thay đổi mật khẩu. Vui lòng thử lại.');
    }
  };

  return (
    <div className="change-password-page" style={{ padding: '20px', backgroundColor: '#f0f2f5', display: 'flex', justifyContent: 'center' }}>
      <Card
        title="Đổi Mật Khẩu"
        style={{
          maxWidth: '400px',
          width: '100%',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          borderRadius: '8px',
        }}
        headStyle={{ backgroundColor: '#001529', color: '#fff', textAlign: 'center' }}
      >
        <Form
          layout="vertical"
          onFinish={handleChangePassword}
        >
          <Form.Item
            label="Mật khẩu cũ"
            name="oldPassword"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu cũ!' }]}
          >
            <Input.Password
              value={passwordData.oldPassword}
              onChange={(e) => setPasswordData({ ...passwordData, oldPassword: e.target.value })}
            />
          </Form.Item>

          <Form.Item
            label="Mật khẩu mới"
            name="newPassword"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu mới!' }]}
          >
            <Input.Password
              value={passwordData.newPassword}
              onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Thay đổi mật khẩu
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default ChangePasswordPage;
