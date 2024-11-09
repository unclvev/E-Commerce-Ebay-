import { FacebookOutlined, GoogleOutlined } from '@ant-design/icons';
import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [otpRequired, setOtpRequired] = useState(false);
    const [loading, setLoading] = useState(false); // Trạng thái loading
    const navigate = useNavigate();

    // Xử lý khi người dùng nhấn "Continue"
    const handleLogin = async () => {
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:5095/api/Login', { Username: username, Password: password });
            if (response.data.jwt) {
                // Lưu JWT vào sessionStorage
                sessionStorage.setItem('token', response.data.jwt);
                navigate('/');
            } else if (response.data.otpRequired) {
                setOtpRequired(true);
            }
        } catch (error) {
            alert(error.response?.data?.message || 'Invalid username or password');
        } finally {
            setLoading(false);
        }
    };

    // Xử lý khi người dùng nhập OTP
    const handleOtpCheck = async () => {
        setLoading(true);
        try {
            await axios.post('http://localhost:5095/api/Otp/check-otp', { Otp: otp });
            alert('OTP is valid! Redirecting...');
            navigate('/');
        } catch (error) {
            alert(error.response?.data?.message || 'Invalid or expired OTP');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-white">
            <div className="flex-none p-4">
                <Link to="/">
                    <img width="120" src="/images/logo.svg" alt="Logo" />
                </Link>
            </div>
            <div className="flex-1 flex justify-center items-center">
                <div className="w-full max-w-md p-8 mr-32">
                    <h1 className="text-5xl font-bold text-center text-black mb-6">Hello</h1>
                    <span className="text-black text-sm text-center block mb-6">
                        Sign in to eBay or <a className='text-blue-600' href='/sign-up'>Create an account</a>
                    </span>

                    {!otpRequired ? (
                        <>
                            <input
                                type="text"
                                placeholder="Email or username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-full mb-4"
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-full mb-4"
                            />
                            <button
                                onClick={handleLogin}
                                className="w-full bg-blue-600 text-white py-2 rounded-full hover:bg-blue-700 mb-4"
                                disabled={loading} // Disable button khi đang xử lý
                            >
                                {loading ? 'Logging in...' : 'Continue'}
                            </button>
                        </>
                    ) : (
                        <>
                            <input
                                type="text"
                                placeholder="Enter OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-full mb-4"
                            />
                            <button
                                onClick={handleOtpCheck}
                                className="w-full bg-blue-600 text-white py-2 rounded-full hover:bg-blue-700 mb-4"
                                disabled={loading} // Disable button khi đang xử lý
                            >
                                {loading ? 'Verifying OTP...' : 'Verify OTP'}
                            </button>
                        </>
                    )}

                    <div className="flex items-center mb-4">
                        <div className="flex-grow border-t border-gray-300" />
                        <span className="mx-4 text-gray-500">or</span>
                        <div className="flex-grow border-t border-gray-300" />
                    </div>

                    <button className="w-full bg-red-500 text-gray-700 py-2 rounded-full hover:bg-red-600 mb-2 flex items-center justify-center border border-gray-300">
                        <GoogleOutlined className="mr-2" size={20} />
                        Continue with Google
                    </button>
                    <button className="w-full bg-blue-500 text-white py-2 rounded-full hover:bg-blue-600 mb-2 flex items-center justify-center">
                        <FacebookOutlined className="mr-2" size={20} />
                        Continue with Facebook
                    </button>

                    <div className="flex justify-center items-center mt-4">
                        <input type="checkbox" id="stay-signed-in" className="mr-2" />
                        <label htmlFor="stay-signed-in" className="text-xl text-black">Stay signed in</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
