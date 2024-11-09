import { FacebookOutlined, GoogleOutlined } from '@ant-design/icons';
import axios from 'axios'; // Đảm bảo đã cài đặt axios để gửi yêu cầu HTTP
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Hàm xử lý đăng nhập
    const handleLogin = async () => {
        try {
            // Gửi yêu cầu đăng nhập tới API
            const response = await axios.post('http://localhost:5095/api/Login', {
                username: username,
                password: password
            });

            // Nếu đăng nhập thành công, lưu token JWT vào localStorage hoặc cookie
            localStorage.setItem('jwt', response.data.jwt);

            // Chuyển hướng tới trang chính hoặc trang người dùng đã đăng nhập
            window.location.href = '/';  // Điều hướng tới trang sau khi đăng nhập thành công
        } catch (error) {
            setErrorMessage('Invalid username or password');
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

                    <input
                        type="text"
                        placeholder="Email or username"
                        className="w-full px-3 py-2 border border-gray-300 rounded-full mb-4"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full px-3 py-2 border border-gray-300 rounded-full mb-4"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {errorMessage && (
                        <div className="text-red-500 text-sm mb-4">{errorMessage}</div>
                    )}
                    <button
                        onClick={handleLogin}
                        className="w-full bg-blue-600 text-white py-2 rounded-full hover:bg-blue-700 mb-4"
                    >
                        Continue
                    </button>

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
