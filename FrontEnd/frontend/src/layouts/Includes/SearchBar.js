import React, { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { useNavigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

function SearchBar() {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get('category'); // Get category from URL if present

  const handleSearch = () => {
    // Redirect to the ProductListPage with category and keyword as query parameters
    navigate(`/productlist?category=${category || ''}&keyword=${keyword}`);
  };

  return (
    <div id='SearchBar' className="border-b relative">
      <div className="flex items-center justify-between w-full mx-auto max-w-[1200px]">
        <div className='flex items-center w-full bg-white'>
          <div className='flex lg:justify-start justify-between gap-10 max-w-[1150px] w-full px-3 py-5 mx-auto'>
            <Link to="/">
              <img width="120" src="/images/logo.svg" alt="Logo" />
            </Link>
            <div className='w-full'>
              <div className='relative'>
                <div className='flex items-center'>
                  <div className='relative flex items-center border-2 border-gray-900 w-full p-2'>
                    <button className='flex items-center'>
                      <AiOutlineSearch className='text-gray-900' />
                    </button>
                    <input
                      className='
                        w-full
                        placeholder-gray-900
                        text-sm
                        pl-3
                        focus:outline-none '
                      placeholder='Search for anything'
                      type='text'
                      value={keyword}
                      onChange={(e) => setKeyword(e.target.value)}
                    />
                  </div>
                  <button
                    className='flex items-center bg-blue-600 text-sm font-semibold text-white p-[11px] ml-2 px-14'
                    onClick={handleSearch}
                  >
                    Search
                  </button>
                  <div className='text-xs px-2 hover:text-blue-500 cursor-pointer'>Advance</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
