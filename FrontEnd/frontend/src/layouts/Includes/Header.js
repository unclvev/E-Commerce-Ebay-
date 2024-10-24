// src/components/Header.js
import React, { useState } from 'react';
import { BsChevronDown } from 'react-icons/bs';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { Link } from 'react-router-dom'; // Import Link từ react-router-dom

function Header() {
    const [isDropdownVisible, setDropdownVisible] = useState(false);

    const toggleDropdown = () => {
        setDropdownVisible(!isDropdownVisible);
    };

    return (
        <div id='header' className="border-b relative">
            <div className="flex items-center justify-between w-full mx-auto max-w-[1200px]">
                <ul id="HeaderLeft" className="flex items-center text-[11px] text-[#333333] px-2 h-8">
                    <li className="relative px-3">
                        {/* Sử dụng thẻ <Link> để điều hướng */}
                        <Link
                            to="/"
                            className="flex items-center gap-2 hover:underline cursor-pointer"
                            onClick={toggleDropdown}
                        >
                            <div>Login</div>
                            <BsChevronDown />
                        </Link>
                        <div
                            id="AuthDropdown"
                            className={`absolute bg-white w-[200px] text-[#333333] z-40 top-[20px] left-0 border shadow-lg ${isDropdownVisible ? 'block' : 'hidden'}`}
                        >
                            <div className="flex items-center justify-start gap-1 p-3">
                                <img width={50} src="https://picsum.photos/200" alt="User Avatar" />
                                <div className="font-bold text-[13px]">John Wick</div>
                            </div>

                            <div className="border-b" />
                            <ul className="bg-white">
                                <li className='text-[11px] py-2 px-4 w-full hover:underline text-blue-500 hover:text-blue-600 cursor-pointer'>
                                    <Link to='/orders'>
                                        My Orders
                                    </Link>
                                </li>
                                <li className='text-[11px] py-2 px-4 w-full hover:underline text-blue-500 hover:text-blue-600 cursor-pointer'>
                                    <Link to='/pages/Authentication/Register'>
                                        Sign Out
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li className="px-3 hover:underline cursor-pointer">Daily Deals</li>
                    <li className="px-3 hover:underline cursor-pointer">Help & Contact</li>
                </ul>
                <ul id="HeaderRight" className="flex items-center text-[11px] text-[#333333] px-2 h-8">
                    <li className="flex items-center gap-2 px-3 hover:underline cursor-pointer">
                        <img width={32} src='/images/uk.png' alt="Ship To" />
                        Ship To
                    </li>
                    <li className="flex items-center gap-2 px-3 hover:underline cursor-pointer">
                        <a href='/watchlist'>
                            Watchlist
                        </a>

                    </li>
                    <li className='px-3 hover:underline cursor-pointer'>
                        <div className='relative'>
                            <AiOutlineShoppingCart size={22} />
                            <div className='absolute text-[10px] -top-[2px] -right-[5px] bg-red-500 w-[14px] h-[14px] rounded-full text-white'>
                                <div className=" flex items-center justify-center -mt-[1px]">3</div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Header;
