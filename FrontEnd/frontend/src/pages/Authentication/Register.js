import { Button, Card, Input, Select } from 'antd';
import React, { useState } from 'react';

const { Option } = Select;

const RegistrationForm = () => {
  const [formType, setFormType] = useState('business'); // State để theo dõi loại form hiện tại
  const [formData, setFormData] = useState({
    businessName: '',
    businessEmail: '',
    password: '',
    businessLocation: '',
    userName: '',
    rePassword: '' // Thêm trường này cho form Personal
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
    <div className="flex h-screen">
      {/* Image Section */}
      {/* Image Section */}
      <div 
  className="flex-1 bg-cover bg-center bg-no-repeat border-r-4 border-gray-300 flex items-center justify-center"
  style={{ 
    width: '50%',  // Chiều rộng của ảnh
    height: '80vh', // Chiều cao của ảnh
    backgroundImage: 'url(https://ir.ebaystatic.com/cr/v/c01/buyer_dweb_business.jpg)',
    backgroundSize: 'cover', // Đảm bảo ảnh vừa khít với phần tử
    backgroundPosition: 'center', // Căn giữa ảnh
    borderRadius: '0 10px 10px 0', // Bo góc bên phải
    overflow: 'hidden', // Ẩn phần ảnh vượt ra ngoài bo góc
    margin: 'auto' // Căn giữa phần tử trong flex container
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
              <>
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
              </>
            ) : (
              <>
                <div>
                  <Input
                    type="text"
                    name="userName"
                    placeholder="Username"
                    value={formData.userName}
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
                  <Input
                    type="password"
                    name="rePassword"
                    placeholder="Re-enter Password"
                    value={formData.rePassword}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </>
            )}
            <div className="text-sm mt-2">
              By selecting Create account, you agree to our <a href="/" className="text-blue-600">User Agreement</a> and acknowledge reading our <a href="#" className="text-blue-600">User Privacy Notice</a>.
            </div>
            <Button type="primary" htmlType="submit" className="w-full mt-4">Create account</Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default RegistrationForm;
