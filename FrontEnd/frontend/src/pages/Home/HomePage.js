// // src/pages/HomePage.js
// import React, { useState, useEffect } from 'react';
// import MainLayout from '../../layouts/MainLayout';
// import Carousel from '../../pages/Home/Includes/Carousel';
// import TrendingCategories from '../../pages/Home/Includes/TrendingCategories';
// import axios from 'axios'; // Import axios để gọi API

// const HomePage = () => {
//     const [products, setProducts] = useState([]); // State để lưu sản phẩm
//     const [loading, setLoading] = useState(true); // State để kiểm tra trạng thái loading

//     useEffect(() => {
//         // Gọi API để lấy danh sách sản phẩm
//         const fetchProducts = async() => {
//             try {
//                 const response = await axios.get('http://localhost:5003/api/product/search'); // Đổi URL này nếu cần
//                 setProducts(response.data); // Lưu sản phẩm vào state
//             } catch (error) {
//                 console.error('Error fetching products:', error);
//             } finally {
//                 setLoading(false); // Đổi trạng thái loading
//             }
//         };

//         fetchProducts(); // Gọi hàm lấy sản phẩm
//     }, []); // Chỉ gọi một lần khi component mount

//     if (loading) {
//         return <div > Loading... < /div>;  / / Hiển thị loading khi đang lấy dữ liệu
//     }

//     return ( <
//         MainLayout >
//         <
//         div className = "mb-8" >
//         <
//         Carousel slides = { slides }
//         /> <
//         /div>

//         <
//         div className = "mb-8" >
//         <
//         TrendingCategories / >
//         <
//         /div>

//         { /* Hiển thị danh sách sản phẩm */ } <
//         div className = "grid grid-cols-4 gap-8" > {
//             products.map((product, index) => ( <
//                 div key = { index }
//                 className = "product-card" >
//                 <
//                 img src = { product.ImageUrl }
//                 alt = { product.Name }
//                 className = "w-full h-48 object-cover" /
//                 >
//                 <
//                 h3 className = "text-xl font-semibold mt-2" > { product.Name } < /h3> <
//                 p className = "text-gray-500" > { product.Description } < /p> <
//                 div className = "flex justify-between items-center mt-4" >
//                 <
//                 span className = "text-lg font-bold" > $ { product.Price } < /span> {
//                     product.OriginalPrice && ( <
//                         span className = "line-through text-gray-400" > $ { product.OriginalPrice } < /span>
//                     )
//                 } <
//                 /div> <
//                 /div>
//             ))
//         } <
//         /div> <
//         /MainLayout>
//     );
// };

// export default HomePage;