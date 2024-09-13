// src/pages/HomePage.js
import React from 'react';
import MainLayout from '../../layouts/MainLayout';
// import ProductList from '../../components/ProductList';
import Carousel from '../../pages/Home/Includes/Carousel'; // Nếu đã tạo component Carousel
import TrendingCategories from '../../pages/Home/Includes/TrendingCategories'; // Nếu đã tạo component TrendingCategories

const HomePage = () => {
  // Dữ liệu sản phẩm mẫu
  // const products = [
  //   { id: 1, name: 'Product 1', price: 100, image: '/images/product1.jpg' },
  //   { id: 2, name: 'Product 2', price: 150, image: '/images/product2.jpg' },
  //   { id: 3, name: 'Product 3', price: 200, image: '/images/product3.jpg' },
  //   { id: 4, name: 'Product 4', price: 250, image: '/images/product4.jpg' },
  // ];

  // Dữ liệu cho carousel
  const slides = [
    {
      image: 'https://i.ebayimg.com/images/g/SDAAAOSwMw5mxy8h/s-l960.webp',
      title: 'Reawaken your passion for collections',
      description: 'Explore a variety of unique cards on eBay.',
      buttonText: 'Find yours',
    },
    {
      image: 'https://stability-images-upload.s3.amazonaws.com/v1_txt2img_8b4c4198-a585-41d6-a0e0-0118bd4e657e.png',
      title: 'Keep it classic, make it unique',
      description: 'Discover your next pre-loved luxury find on eBay.',
      buttonText: 'Create your look',
    },
    {
      image: 'https://www.beyoung.in/blog/wp-content/uploads/2023/08/header-final.jpg',
      title: 'Explore tech deals',
      description: 'Get the latest gadgets at unbeatable prices.',
      buttonText: 'Shop now',
    },
  ];

  // Dữ liệu cho 2 slide riêng biệt
  const singleSlideBanner1 = [
    {
      image: 'https://i.ebayimg.com/images/g/4YgAAOSwT51m1sNl/s-l960.webp',
      title: 'Timeless appeal, timeless style',
      description: 'Choose pre-loved and bring luxury favorites to life.',
      buttonText: 'Shop style stables',
    },
  ];

  const singleSlideBanner2 = [
    {
      image: 'https://i.ebayimg.com/images/g/HncAAOSw8FNmzvuG/s-l960.webp',
      title: 'Sneakers for your path',
      description: 'Express yourself with iconic footwear from the best brands.',
      buttonText: 'Shop now',
    },
  ];

  return (
    <MainLayout>
      {/* Phần carousel hiển thị hình ảnh và thông điệp */} 
      <div className="mb-8">
        <Carousel slides={slides} />
      </div>

      {/* Phần danh mục xu hướng */}
      <div className="mb-8">
        <TrendingCategories />
      </div>

      {/* Banner riêng cho slide thứ 4 */}
      <div className="mb-8">
        <Carousel slides={singleSlideBanner1} hideNavigation={true} />
      </div>

      {/* Banner riêng cho slide thứ 5 */}
      <div className="mb-8">
        <Carousel slides={singleSlideBanner2} hideNavigation={true} />
      </div>

      {/* Phần sản phẩm nổi bật
      <div className="mt-8">
        <h1 className="text-2xl font-bold mb-4">Featured Products</h1>
        <ProductList products={products} />
      </div> */}
    </MainLayout>
  );
};

export default HomePage;
