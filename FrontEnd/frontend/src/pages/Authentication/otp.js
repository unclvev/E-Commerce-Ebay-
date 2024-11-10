import { Button, Input, message } from 'antd';
import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const OtpVerification = () => {
  const [otp, setOtp] = useState('');
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  const handleOtpSubmit = async () => {
    try {
      // Send OTP to backend for verification
      const response = await axios.post('http://localhost:5095/api/Otp/check-otp', { otp });
      if (response.status === 200) {
        message.success(response.data);
        setIsOtpVerified(true);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        message.error(error.response.data); 
      } else {
        message.error('An error occurred during OTP verification.');
      }
    }
  };

  return (
    <div className="relative h-screen flex">
      <div className="absolute top-4 left-4">
        <Link to="/">
          <img width="120" src="/images/logo.svg" alt="Logo" />
        </Link>
      </div>
      <div className="flex-1 flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
          <h2 className="text-center text-lg font-semibold">Enter OTP</h2>
          <p className="text-center text-gray-500 text-sm mb-6">
            Please enter the OTP sent to your email to verify your account.
          </p>
          <Input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="mb-4"
          />
          <Button
            type="primary"
            onClick={handleOtpSubmit}
            className="w-full mt-2"
          >
            Verify OTP
          </Button>
          {isOtpVerified && (
            <p className="text-green-500 text-center mt-4">Account verified successfully!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;
