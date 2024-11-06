import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const ProfilePage = () => {
  const { userId } = useParams(); // Lấy userId từ URL
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    address: '',
    phoneNumber: '',
    email: ''
  });
  const [editMode, setEditMode] = useState(false);
  const [message, setMessage] = useState('');

  // Tải thông tin người dùng từ API
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!userId) {
        setMessage('User ID không hợp lệ.');
        return;
      }

      try {
        const response = await axios.get(`http://localhost:5191/api/User/${userId}`);
        if (response.status === 200) {
          setUser(response.data); // Cập nhật thông tin người dùng
        } else {
          setMessage('Không tìm thấy hồ sơ người dùng.');
        }
      } catch (error) {
        console.error('Lỗi khi tải hồ sơ người dùng:', error);
        setMessage('Lỗi khi tải hồ sơ người dùng. Vui lòng thử lại sau.');
      }
    };

    fetchUserProfile(); // Gọi API nếu có userId
  }, [userId]); // Chạy lại khi userId thay đổi

  // Cập nhật hồ sơ người dùng
  const handleUpdateProfile = async () => {
    try {
      const response = await axios.put(`http://localhost:5191/api/User/edit/${userId}`, user);
      if (response.data && response.data.message) {
        setMessage(response.data.message); // Hiển thị thông báo từ API
      }
      setEditMode(false); // Tắt chế độ chỉnh sửa
    } catch (error) {
      console.error('Lỗi khi cập nhật hồ sơ:', error);
      setMessage('Lỗi khi cập nhật hồ sơ. Vui lòng thử lại.');
    }
  };

  return (
    <div className="profile-page">
      <h2>Hồ Sơ Người Dùng</h2>
      {message && <p>{message}</p>} {/* Hiển thị thông báo nếu có */}

      {!editMode ? (
        <div>
          <p><strong>Tên:</strong> {user.firstName}</p>
          <p><strong>Họ:</strong> {user.lastName}</p>
          <p><strong>Địa chỉ:</strong> {user.address}</p>
          <p><strong>Số điện thoại:</strong> {user.phoneNumber}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <button onClick={() => setEditMode(true)}>Chỉnh sửa Hồ Sơ</button>
          <br />
          <Link to={`/change-password/${userId}`}>Đổi mật khẩu</Link> {/* Thêm liên kết đổi mật khẩu */}
        </div>
      ) : (
        <div>
          <label>
            Tên:
            <input
              type="text"
              value={user.firstName}
              onChange={(e) => setUser({ ...user, firstName: e.target.value })}
            />
          </label>
          <br />
          <label>
            Họ:
            <input
              type="text"
              value={user.lastName}
              onChange={(e) => setUser({ ...user, lastName: e.target.value })}
            />
          </label>
          <br />
          <label>
            Địa chỉ:
            <input
              type="text"
              value={user.address}
              onChange={(e) => setUser({ ...user, address: e.target.value })}
            />
          </label>
          <br />
          <label>
            Số điện thoại:
            <input
              type="text"
              value={user.phoneNumber}
              onChange={(e) => setUser({ ...user, phoneNumber: e.target.value })}
            />
          </label>
          <br />
          <label>
            Email:
            <input
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </label>
          <br />
          <button onClick={handleUpdateProfile}>Lưu</button>
          <button onClick={() => setEditMode(false)}>Hủy</button>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
