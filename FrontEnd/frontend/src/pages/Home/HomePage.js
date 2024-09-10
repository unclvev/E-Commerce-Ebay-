// src/pages/HomePage.js
import React from 'react';
import MainLayout from '../../layouts/MainLayout';
import ProductList from '../../components/ProductList';

const HomePage = () => {
  // Dữ liệu mẫu sản phẩm
  const products = [
    { id: 1, name: 'Product 1', price: 100, image: '/path-to-image' },
    { id: 2, name: 'Product 2', price: 150, image: '/path-to-image' },
  ];

  return (
    <MainLayout>
      <div>
        <h1>Featured Products</h1>
        <ProductList products={products} />
      </div>
    </MainLayout>
  );
};

export default HomePage;
