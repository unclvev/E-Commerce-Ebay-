import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Form, Input, Button, message as antdMessage } from 'antd';
import MainLayout from '../../layouts/MainLayout'; // Đảm bảo rằng đường dẫn đúng

const ChangePasswordPage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: ''
  });

  const handleChangePassword = async () => {
    try {
      const response = await axios.put(`http://localhost:5191/api/User/change-password/${userId}`, passwordData);
      if (response.data && response.data.message) {
        antdMessage.success(response.data.message);
        navigate(`/profile/${userId}`);
      }
    } catch (error) {
      console.error('Lỗi khi thay đổi mật khẩu:', error);
      antdMessage.error('Lỗi khi thay đổi mật khẩu. Vui lòng thử lại.');
    }
  };

  return (
    <MainLayout>
      <div style={{ padding: '40px 0', backgroundColor: '#f5f7fa', minHeight: 'calc(100vh - 130px)', display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '100%', maxWidth: '600px' }}>
          <Card
            title="Đổi Mật Khẩu"
            style={{
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              borderRadius: '10px',
            }}
            headStyle={{ backgroundColor: '#3b5998', color: '#fff', textAlign: 'center' }}
          >
            <Form layout="vertical" onFinish={handleChangePassword}>
              <Form.Item label="Mật khẩu cũ" name="oldPassword" rules={[{ required: true, message: 'Vui lòng nhập mật khẩu cũ!' }]}>
                <Input.Password
                  value={passwordData.oldPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, oldPassword: e.target.value })}
                />
              </Form.Item>
              <Form.Item label="Mật khẩu mới" name="newPassword" rules={[{ required: true, message: 'Vui lòng nhập mật khẩu mới!' }]}>
                <Input.Password
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" block>Thay đổi mật khẩu</Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default ChangePasswordPage;
