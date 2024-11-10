import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SubHeader() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();  // Hook to navigate programmatically

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5003/api/product/categories');
        setCategories(response.data); 
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryName) => {
    // Navigate to ProductListPage with category as a query parameter
    navigate(`/productlist?category=${categoryName}`);
  };

  return (
    <div id="SubHeader" className="border-b">
      <div className="flex items-center justify-between w-full mx-auto max-w-[1200px]">
        <ul id="HeaderLeft" className="flex items-center text-[13px] text-[#333333] px-2 h-8">
          {categories.length > 0 ? (
            categories.map((category, index) => (
              <li
                key={index}
                className="px-3 hover:underline cursor-pointer"
                onClick={() => handleCategoryClick(category.categoryName)}
              >
                {category.categoryName}
              </li>
            ))
          ) : (
            <li className="px-3">No categories available</li>
          )}
        </ul>
      </div>
    </div>
  );
}
