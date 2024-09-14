import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <h2 className="text-2xl font-bold">Create an account</h2>
        <div className="flex space-x-2 mt-2">
          <Button variant="outline">Personal</Button>
          <Button variant="default">Business</Button>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
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
            <Select onValueChange={(value) => setFormData(prev => ({ ...prev, businessLocation: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Where is your business registered?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="us">United States</SelectItem>
                <SelectItem value="uk">United Kingdom</SelectItem>
                <SelectItem value="ca">Canada</SelectItem>
                {/* Thêm các quốc gia khác ở đây */}
              </SelectContent>
            </Select>
          </div>
          <div className="text-sm">
            By selecting Create business account, you agree to our <a href="#" className="text-blue-600">User Agreement</a> and acknowledge reading our <a href="#" className="text-blue-600">User Privacy Notice</a>.
          </div>
          <Button type="submit" className="w-full">Create business account</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default BusinessRegistrationForm;