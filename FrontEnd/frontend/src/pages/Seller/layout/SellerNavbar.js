// SellerNavbar.js
import { Button } from 'antd';
import { Link, useLocation } from 'react-router-dom';

const SellerNavbar = () => {
    const location = useLocation();  // Lấy thông tin trang hiện tại

    // Hàm kiểm tra trang hiện tại để đổi màu nút
    const isActive = (path) => {
        // Nếu đường dẫn bắt đầu với '/seller/order', thì làm nút "Manage Orders" đổi màu
        if (path === '/seller/order' && location.pathname.startsWith('/seller/order')) {
            return 'primary';
        }
        return location.pathname === path ? 'primary' : 'default';
    };

    return (
        <div className="flex justify-between items-center mb-6 bg-gray-100 p-4 rounded-lg shadow">
            <div className="text-xl font-semibold">Seller Dashboard</div>
            <div className="space-x-4">
                <Link to="/seller/dashboard">
                    <Button type={isActive('/seller/dashboard')}>Dashboard</Button>
                </Link>
                <Link to="/seller/product">
                    <Button type={isActive('/seller/product')}>Manage Products</Button>
                </Link>
                <Link to="/seller/order">
                    <Button type={isActive('/seller/order')}>Manage Orders</Button>
                </Link>
                <Link to="/seller/promotion">
                    <Button type={isActive('/seller/promotion')}>Promotion</Button>
                </Link>
            </div>
        </div>
    );
};

export default SellerNavbar;
