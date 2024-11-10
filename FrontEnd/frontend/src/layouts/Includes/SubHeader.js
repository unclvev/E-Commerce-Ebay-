import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function SubHeader() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5003/api/product/categories');
        console.log("Aha bên subheader" + response.data);  // Log dữ liệu API ra console
        setCategories(response.data);  // Lưu dữ liệu categories vào state
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
  
    fetchCategories();
  }, []);
  

  return (
    <>
      <div id="SubHeader" className="border-b">
        <div className="flex items-center justify-between w-full mx-auto max-w-[1200px]">
          <ul
            id="HeaderLeft"
            className="flex items-center text-[13px] text-[#333333] px-2 h-8"
          >
            {categories.length > 0 ? ( // Kiểm tra nếu categories có dữ liệu
              categories.map((category, index) => (
                <li key={index} className="px-3 hover:underline cursor-pointer">
                  {category.categoryName} {/* Hiển thị tên category */}
                </li>
              ))
            ) : (
              <li className="px-3">No categories available</li> // Thông báo khi không có dữ liệu
            )}
          </ul>
        </div>
      </div>
    </>
  );
}
