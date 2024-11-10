import { jwtDecode } from 'jwt-decode'; // sửa lại import cho đúng
import React, { useEffect, useState } from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { BsChevronDown } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('jwt');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUser({
                    email: decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"]
                });
            } catch (error) {
                console.error("Invalid JWT", error);
            }
        }
    }, []);

    const toggleDropdown = () => {
        setDropdownVisible(!isDropdownVisible);
    };

    const handleLogout = () => {
        localStorage.removeItem('jwt');
        setUser(null);
        navigate('/sign-in');
    };

    return (
        <div id='header' className="border-b relative">
            <div className="flex items-center justify-between w-full mx-auto max-w-[1200px]">
                <ul id="HeaderLeft" className="flex items-center text-[11px] text-[#333333] px-2 h-8">
                    <li className="px-3 hover:underline cursor-pointer">Daily Deals</li>
                    <li className="px-3 hover:underline cursor-pointer">Help & Contact</li>
                    <li className="px-3 hover:underline cursor-pointer">
                        <Link to='/seller/dashboard'>My Shop</Link>
                    </li>
                </ul>
                <ul id="HeaderRight" className="flex items-center text-[11px] text-[#333333] px-2 h-8">
                    <li className="flex items-center gap-2 px-3 hover:underline cursor-pointer">
                        <img width={32} src='/images/uk.png' alt="Ship To" />
                        Ship To
                    </li>
                    <li className="flex items-center gap-2 px-3 hover:underline cursor-pointer">
                        <a href='/watchlist'>Watchlist</a>
                    </li>
                    <li className='px-3 hover:underline cursor-pointer'>
                        <div className='relative'>
                            <AiOutlineShoppingCart size={22} />
                            <div className='absolute text-[10px] -top-[2px] -right-[5px] bg-red-500 w-[14px] h-[14px] rounded-full text-white'>
                                <div className=" flex items-center justify-center -mt-[1px]">3</div>
                            </div>
                        </div>
                    </li>
                    <li className="relative px-3">
                        {user ? (
                            <div className="flex items-center gap-2 cursor-pointer" onClick={toggleDropdown}>
                                <img width={30} src="/images/avatar.jpg" alt="User Avatar" className="rounded-full" />
                                <span>{user.email}</span>
                                <BsChevronDown />
                            </div>
                        ) : (
                            <Link to="/sign-in" className="flex items-center gap-2 hover:underline cursor-pointer">
                                <div>Login</div>
                                <BsChevronDown />
                            </Link>
                        )}
                        <div
                            id="AuthDropdown"
                            className={`absolute bg-white w-[200px] text-[#333333] z-40 top-[20px] left-0 border shadow-lg ${isDropdownVisible ? 'block' : 'hidden'}`}
                        >
                            {user ? (
                                <>
                                    <div className="flex items-center justify-start gap-1 p-3">
                                        <img width={50} src="https://picsum.photos/200" alt="User Avatar" />
                                        <div className="font-bold text-[13px]">{user.email}</div>
                                    </div>
                                    <div className="border-b" />
                                    <ul className="bg-white">
                                        <li className='text-[11px] py-2 px-4 w-full hover:underline text-blue-500 hover:text-blue-600 cursor-pointer'>
                                            <Link to='/orders'>My Orders</Link>
                                        </li>
                                        <li className='text-[11px] py-2 px-4 w-full hover:underline text-blue-500 hover:text-blue-600 cursor-pointer'>
                                            <button onClick={handleLogout}>Sign Out</button>
                                        </li>
                                    </ul>
                                </>
                            ) : (
                                <ul className="bg-white">
                                    <li className='text-[11px] py-2 px-4 w-full hover:underline text-blue-500 hover:text-blue-600 cursor-pointer'>
                                        <Link to='/sign-in'>Sign In</Link>
                                    </li>
                                    <li className='text-[11px] py-2 px-4 w-full hover:underline text-blue-500 hover:text-blue-600 cursor-pointer'>
                                        <Link to='/sign-up'>Register</Link>
                                    </li>
                                </ul>
                            )}
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Header;
