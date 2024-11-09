import { Button, Card, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      console.log('Form submitted:', formData);
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
    </div>
  );
};

export default RegistrationForm;
