import { Button, Card, Input, Modal, message } from 'antd';
import axios from 'axios'; // Đảm bảo đã cài axios để gửi yêu cầu HTTP
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const PersonalForm = ({ formData, handleInputChange, handleInputBlur, errors, touched }) => (
  <>
    <div>
      <Input
        type="text"
        name="userName"
        placeholder="Username"
        value={formData.userName}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        required
      />
      {touched.userName && errors.userName && <p className="text-red-500 text-xs mt-1">{errors.userName}</p>}
    </div>
    <div>
      <Input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        required
      />
      {touched.email && errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
    </div>
    <div>
      <Input
        type="text"
        name="address"
        placeholder="Address"
        value={formData.address}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
      />
      {touched.address && errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
    </div>
    <div>
      <Input
        type="text"
        name="phoneNumber"
        placeholder="Phone Number"
        value={formData.phoneNumber}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
      />
      {touched.phoneNumber && errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>}
    </div>
    <div>
      <Input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        required
      />
      {touched.password && errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
    </div>
    <div>
      <Input
        type="password"
        name="rePassword"
        placeholder="Re-enter Password"
        value={formData.rePassword}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        required
      />
      {touched.rePassword && errors.rePassword && <p className="text-red-500 text-xs mt-1">{errors.rePassword}</p>}
    </div>
  </>
);

const RegistrationForm = () => {
  const [formType, setFormType] = useState('personal');
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    address: '',
    phoneNumber: '',
    password: '',
    rePassword: ''
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [isOtpModalVisible, setIsOtpModalVisible] = useState(false);  // Hiển thị modal nhập OTP
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');  // OTP từ server
  const navigate = useNavigate(); // Hook để điều hướng trang mới

  useEffect(() => {
    validateForm();
  }, [formData, formType]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.userName) newErrors.userName = 'Username is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (!formData.rePassword) newErrors.rePassword = 'Re-enter Password is required';
    if (formData.password !== formData.rePassword) newErrors.rePassword = 'Passwords do not match';
    setErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleInputBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    validateForm();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid) {
      try {
        // Gửi yêu cầu đăng ký tới backend để nhận OTP
        const response = await axios.post('http://localhost:5095/api/Register', formData, { withCredentials: true });
        
        setGeneratedOtp(response.data.otp); // Lưu OTP nhận được từ server
        setIsOtpModalVisible(true);  // Mở modal nhập OTP
        
      } catch (error) {
        console.error('Error registering user:', error);
        message.error('Failed to register user');
      }
    }
  };

  const handleOtpSubmit = async () => {
    try {
      // Gửi OTP người dùng nhập vào để kiểm tra
      const response = await axios.post('http://localhost:5095/api/Otp/check-otp', { otp }, { withCredentials: true });
      if (response.status === 200) {
        message.success('OTP verified successfully');
        
        // Chuyển hướng sang trang khác sau khi OTP hợp lệ
        navigate('/sign-in'); // Đổi '/welcome' thành đường dẫn trang bạn muốn chuyển đến
        
      }
    } catch (error) {
      message.error('Invalid OTP');
    }
  };

  return (
    <div className="relative h-screen flex">
      <div className="absolute top-4 left-4">
        <Link to="/">
          <img width="120" src="/images/logo.svg" alt="Logo" />
        </Link>
      </div>
      <div
        className="flex-1 bg-cover bg-center bg-no-repeat border-r-4 border-gray-300 flex items-center justify-center"
        style={{
          width: '50%',
          height: '80vh',
          backgroundImage: 'url(https://ir.ebaystatic.com/cr/v/c01/buyer_dweb_business.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '0 10px 10px 0',
          overflow: 'hidden',
          margin: 'auto'
        }}
      >
      </div>
      <div className="flex-1 flex items-center justify-center bg-gray-100">
        <Card title="Create an account" className="w-full max-w-md">
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <PersonalForm
              formData={formData}
              handleInputChange={handleInputChange}
              handleInputBlur={handleInputBlur}
              errors={errors}
              touched={touched}
            />
            <div className="text-gray-500 text-xs mt-4">
              By signing up, you agree to our <a href="/" className="text-black">User Agreement</a> and acknowledge reading our <a href="/" className="text-black">User Privacy Notice</a>.
            </div>
            <Button
              type="primary"
              htmlType="submit"
              className={`w-full mt-4 ${isFormValid ? '' : 'bg-gray-400'}`}
              disabled={!isFormValid}
            >
              Create account
            </Button>
          </form>
        </Card>
      </div>

      {/* Modal nhập OTP */}
      <Modal
        title="Enter OTP"
        visible={isOtpModalVisible}
        onCancel={() => setIsOtpModalVisible(false)}
        onOk={handleOtpSubmit}
      >
        <Input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
      </Modal>
    </div>
  );
};

export default RegistrationForm;
