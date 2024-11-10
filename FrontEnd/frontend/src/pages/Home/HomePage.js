import React, { useState, useEffect } from 'react'; 
import { Link } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout';
import Carousel from '../../pages/Home/Includes/Carousel';
import TrendingCategories from '../../pages/Home/Includes/TrendingCategories';
import axios from 'axios';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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
    <>
      <div className="mb-8">
        <Carousel slides={slides} />
      </div>

      <div className="mb-8">
        <TrendingCategories />
      </div>
    </>
  );
};

export default HomePage;
