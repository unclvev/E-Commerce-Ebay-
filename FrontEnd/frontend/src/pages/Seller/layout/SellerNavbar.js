import { DownOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu } from 'antd';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const SellerNavbar = () => {
    const location = useLocation();  // Lấy thông tin trang hiện tại
    const [jwt, setJwt] = useState(null);  // State để lưu JWT từ localStorage
    const [email, setEmail] = useState(null);  // State để lưu email của người dùng
    const navigate = useNavigate();  // Sử dụng useNavigate để điều hướng

    // Lấy JWT từ localStorage khi component mount
    useEffect(() => {
        const storedJwt = localStorage.getItem('jwt');
        if (storedJwt) {
            setJwt(storedJwt);
            try {
                // Giải mã JWT và lấy email
                const decodedToken = jwtDecode(storedJwt);
                setEmail(decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"]);  // Lấy email từ JWT
            } catch (error) {
                console.error("Invalid JWT", error);
            }
        }
    }, []);

    // Hàm kiểm tra trang hiện tại để đổi màu nút
    const isActive = (path) => {
        if (path === '/seller/order' && location.pathname.startsWith('/seller/order')) {
            return 'primary';
        }
        return location.pathname === path ? 'primary' : 'default';
    };

    // Hàm xử lý logout
    const handleLogout = () => {
        // Xóa JWT khỏi localStorage
        localStorage.removeItem('jwt');
        setJwt(null);  // Xóa JWT trong state
        setEmail(null); // Xóa email trong state

        // Điều hướng về trang login sau khi logout
        navigate('/sign-in');  // Dùng navigate thay vì history.push
    };

    // Tạo menu cho dropdown khi click vào avatar
    const menu = (
        <Menu>
            <Menu.Item>
                <Link to="/profile">Profile</Link>
            </Menu.Item>
            <Menu.Item>
                <Button type="link" onClick={handleLogout}>Logout</Button>
            </Menu.Item>
        </Menu>
    );

    return (
        <div className="flex justify-between items-center mb-6 bg-gray-100 p-4 rounded-lg shadow">
            <div className="text-xl font-semibold">Seller Dashboard</div>
            <div className="space-x-4">
                <Link to="/seller/product">
                    <Button type={isActive('/seller/product')}>Manage Products</Button>
                </Link>
                <Link to="/seller/order">
                    <Button type={isActive('/seller/order')}>Manage Orders</Button>
                </Link>
                <Link to="/seller/dashboard">
                    <Button type={isActive('/seller/dashboard')}>Dashboard</Button>
                </Link>
                <Link to="/seller/promotion">
                    <Button type={isActive('/seller/promotion')}>Promotion</Button>
                </Link>
            </div>

            {/* Hiển thị thông tin nếu có JWT */}
            {jwt ? (
                <div className="flex items-center ml-4">
                    <div className="mr-3 text-gray-700">
                        {/* Hiển thị email bên trái avatar */}
                        <span>{email}</span>
                    </div>
                    <Dropdown overlay={menu} trigger={['click']}>
                        <div className="flex items-center cursor-pointer">
                            <img
                                src="/images/avatar.jpg"  // Đường dẫn tới avatar
                                alt="Avatar"
                                className="w-10 h-10 rounded-full mr-2"
                            />
                            <DownOutlined />
                        </div>
                    </Dropdown>
                </div>
            ) : (
                <Link to="/sign-in">
                    <Button className="ml-4" type="default">Login</Button>
                </Link>
            )}
        </div>
    );
};

export default SellerNavbar;
