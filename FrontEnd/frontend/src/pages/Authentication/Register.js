import { Button, Card, Input, Select } from 'antd';
import React, { useState, useEffect } from 'react';
import { GoogleOutlined, FacebookOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'; // Import Link từ react-router-dom

const { Option } = Select;

const BusinessForm = ({ formData, handleInputChange, handleInputBlur, handleSelectBlur, errors, touched }) => (
  <>
    <div>
      <Input
        type="text"
        name="businessName"
        placeholder="Business name"
        value={formData.businessName}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        required
      />
      {touched.businessName && errors.businessName && <p className="text-red-500 text-xs mt-1">{errors.businessName}</p>}
    </div>
    <div>
      <Input
        type="email"
        name="businessEmail"
        placeholder="Business email"
        value={formData.businessEmail}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        required
      />
      {touched.businessEmail && errors.businessEmail && <p className="text-red-500 text-xs mt-1">{errors.businessEmail}</p>}
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
      <Select
        placeholder="Where is your business registered?"
        onChange={(value) => handleInputChange({ target: { name: 'businessLocation', value } })}
        value={formData.businessLocation}
        style={{ width: '100%' }}
        onBlur={handleSelectBlur}
      >
        <Option value="us">United States</Option>
        <Option value="uk">United Kingdom</Option>
        <Option value="ca">Canada</Option>
        {/* Thêm các quốc gia khác ở đây */}
      </Select>
      {touched.businessLocation && errors.businessLocation && <p className="text-red-500 text-xs mt-1">{errors.businessLocation}</p>}
    </div>
  </>
);

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
  const [formType, setFormType] = useState('personal'); // Hiển thị form Personal đầu tiên
  const [formData, setFormData] = useState({
    businessName: '',
    businessEmail: '',
    password: '',
    businessLocation: '',
    userName: '',
    rePassword: ''
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    validateForm();
  }, [formData, formType]);

  const validateForm = () => {
    const newErrors = {};
    if (formType === 'business') {
      if (!formData.businessName) newErrors.businessName = 'Business name is required';
      if (!formData.businessEmail) newErrors.businessEmail = 'Business email is required';
      if (!formData.password) newErrors.password = 'Password is required';
      if (!formData.businessLocation) newErrors.businessLocation = 'Business location is required';
    } else {
      if (!formData.userName) newErrors.userName = 'Username is required';
      if (!formData.password) newErrors.password = 'Password is required';
      if (!formData.rePassword) newErrors.rePassword = 'Re-enter Password is required';
      if (formData.password !== formData.rePassword) newErrors.rePassword = 'Passwords do not match';
    }
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
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    validateForm();
  };

  const handleSelectBlur = () => {
    setTouched(prev => ({ ...prev, businessLocation: true }));
    handleInputBlur({ target: { name: 'businessLocation', value: formData.businessLocation } });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      console.log('Form submitted:', formData);
      // Xử lý gửi dữ liệu đăng ký ở đây
    }
  };

  return (
    <div className="relative h-screen flex">
      {/* Logo Section */}
      <div className="absolute top-4 left-4">
        <Link to="/">
          <img width="120" src="/images/logo.svg" alt="Logo" />
        </Link>
      </div>

      {/* Image Section */}
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
        {/* Nội dung khác (nếu cần) */}
      </div>

      {/* Form Login Section */}
      <div className="flex-1 flex items-center justify-center bg-gray-100">
        <Card title="Create an account" className="w-full max-w-md">
          <div className="flex space-x-2 mt-2">
            <Button
              type={formType === 'personal' ? 'primary' : 'default'}
              onClick={() => setFormType('personal')}
            >
              Personal
            </Button>
            <Button
              type={formType === 'business' ? 'primary' : 'default'}
              onClick={() => setFormType('business')}
            >
              Business
            </Button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            {formType === 'business' ? (
              <BusinessForm
                formData={formData}
                handleInputChange={handleInputChange}
                handleInputBlur={handleInputBlur}
                handleSelectBlur={handleSelectBlur}
                errors={errors}
                touched={touched}
              />
            ) : (
              <PersonalForm
                formData={formData}
                handleInputChange={handleInputChange}
                handleInputBlur={handleInputBlur}
                errors={errors}
                touched={touched}
              />
            )}
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
            {formType === 'personal' && (
              <div className="text-center my-4">
                <div className="flex items-center justify-center">
                  <div className="flex-grow border-t border-gray-300" />
                  <span className="mx-4 text-gray-500">or</span>
                  <div className="flex-grow border-t border-gray-300" />
                </div>
                <div className="flex flex-col items-center space-y-4 mt-4">
                  <div className="flex space-x-4 w-full">
                    <Button
                      className="flex-1"
                      type="default"
                      style={{ borderColor: '#ed1f0c', color: '#ed1f0c' }}
                      icon={<GoogleOutlined />} // Sử dụng biểu tượng Ant Design
                    >
                      Google
                    </Button>
                    <Button
                      className="flex-1"
                      type="default"
                      style={{ borderColor: '#4285F4', color: '#4285F4' }}
                      icon={<FacebookOutlined />} // Sử dụng biểu tượng Ant Design
                    >
                      Facebook
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </form>
        </Card>
      </div>
    </div>
  );
};

export default RegistrationForm;
