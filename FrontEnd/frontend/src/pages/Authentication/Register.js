import { Button, Card, Input, Select } from 'antd';
import React, { useState } from 'react';

const { Option } = Select;

const BusinessRegistrationForm = () => {
  const [formData, setFormData] = useState({
    businessName: '',
    businessEmail: '',
    password: '',
    businessLocation: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Xử lý gửi dữ liệu đăng ký ở đây
  };

  return (
    <Card title="Create an account" className="w-full max-w-md mx-auto">
      <div className="flex space-x-2 mt-2">
        <Button type="default">Personal</Button>
        <Button type="primary">Business</Button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        <div>
          <Input
            type="text"
            name="businessName"
            placeholder="Business name"
            value={formData.businessName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <Input
            type="email"
            name="businessEmail"
            placeholder="Business email"
            value={formData.businessEmail}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <Select
            placeholder="Where is your business registered?"
            onChange={(value) => setFormData(prev => ({ ...prev, businessLocation: value }))}
            value={formData.businessLocation}
            style={{ width: '100%' }}
          >
            <Option value="us">United States</Option>
            <Option value="uk">United Kingdom</Option>
            <Option value="ca">Canada</Option>
            {/* Thêm các quốc gia khác ở đây */}
          </Select>
        </div>
        <div className="text-sm mt-2">
          By selecting Create business account, you agree to our <a href="#" className="text-blue-600">User Agreement</a> and acknowledge reading our <a href="#" className="text-blue-600">User Privacy Notice</a>.
        </div>
        <Button type="primary" htmlType="submit" className="w-full mt-4">Create business account</Button>
      </form>
    </Card>
  );
};

export default BusinessRegistrationForm;
