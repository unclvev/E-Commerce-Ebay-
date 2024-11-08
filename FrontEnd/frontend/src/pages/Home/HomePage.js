import React, { useState, useEffect } from 'react'; 
import MainLayout from '../../layouts/MainLayout';
import Carousel from '../../pages/Home/Includes/Carousel';
import TrendingCategories from '../../pages/Home/Includes/TrendingCategories';
import axios from 'axios';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Định nghĩa dữ liệu slides cho carousel
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
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5003/api/product/search'); 
        setProducts(response.data);  
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false); 
      }
    };

    fetchProducts();  
  }, []);  

  if (loading) {
    return <div>Loading...</div>;  
  }

  return (
    <MainLayout>

      <div className="mb-8">
        <Carousel slides={slides} /> {/* Truyền dữ liệu slides vào Carousel */}
      </div>

      <div className="mb-8">
        <TrendingCategories />
      </div>
      <div className="grid grid-cols-4 gap-8">
        {products.map((product, index) => (
          <div key={index} className="product-card">
            <img
              src={product.ImageUrl}
              alt={product.Name}
              className="w-full h-48 object-cover"
            />
            <h3 className="text-xl font-semibold mt-2">{product.Name}</h3>
            <p className="text-gray-500">{product.Description}</p>
            <div className="flex justify-between items-center mt-4">
              <span className="text-lg font-bold">${product.Price}</span>
              {product.OriginalPrice && (
                <span className="line-through text-gray-400">${product.OriginalPrice}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </MainLayout>
  );
};

export default HomePage;

