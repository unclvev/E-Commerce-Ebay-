import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ChangePasswordPage = () => {
  const { userId } = useParams(); // Lấy userId từ URL
  const navigate = useNavigate(); // Để chuyển hướng sau khi thay đổi mật khẩu
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: ''
  });
  const [message, setMessage] = useState('');

  // Xử lý khi người dùng gửi yêu cầu thay đổi mật khẩu
  const handleChangePassword = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5191/api/User/change-password/${userId}`,
        passwordData
      );
      if (response.data && response.data.message) {
        setMessage(response.data.message); // Hiển thị thông báo từ API
        // Chuyển hướng về trang hồ sơ sau khi thay đổi mật khẩu thành công
        navigate(`/profile/${userId}`);
      }
    } catch (error) {
      console.error('Lỗi khi thay đổi mật khẩu:', error);
      setMessage('Lỗi khi thay đổi mật khẩu. Vui lòng thử lại.');
    }
  };

  return (
    <div className="change-password-page">
      <h2>Đổi Mật Khẩu</h2>
      {message && <p>{message}</p>} {/* Hiển thị thông báo nếu có */}

      <label>
        Mật khẩu cũ:
        <input
          type="password"
          value={passwordData.oldPassword}
          onChange={(e) => setPasswordData({ ...passwordData, oldPassword: e.target.value })}
        />
      </label>
      <br />
      <label>
        Mật khẩu mới:
        <input
          type="password"
          value={passwordData.newPassword}
          onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
        />
      </label>
      <br />
      <button onClick={handleChangePassword}>Thay đổi mật khẩu</button>
    </div>
  );
};

export default ChangePasswordPage;
