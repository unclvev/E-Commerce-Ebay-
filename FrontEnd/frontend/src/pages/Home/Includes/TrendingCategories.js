// src/components/TrendingCategories.js
import React from 'react';

const TrendingCategory = ({ icon, title, link }) => (
  <a href="/" className="flex flex-col items-center group" target="_blank" rel="noopener noreferrer">
    <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center mb-2 overflow-hidden group-hover:border-b-2 group-hover:border-blue-500">
      <img src={icon} alt={title} className="w-full h-full object-cover" />
    </div>
    <span className="text-sm text-center group-hover:underline">{title}</span>
  </a>
);

const TrendingCategories = () => {
  const categories = [
    { icon: 'https://ir.ebaystatic.com/cr/v/c01/01_PopularDestination_Luxury.jpg', title: 'Luxury', link: 'https://example.com/luxury' },
    { icon: 'https://ir.ebaystatic.com/cr/v/c01/02_PopularDestination_Sneakers.jpg', title: 'Sneakers', link: 'https://example.com/sneakers' },
    { icon: 'https://i.ebayimg.com/00/s/Mjg4WDI4OA==/z/4t4AAOSwfvFmzeI2/$_1.JPG', title: 'Grow your garage with P&A', link: 'https://example.com/garage' },
    { icon: 'https://ir.ebaystatic.com/cr/v/c01/ECM_PopularDestination_Reburbished.jpg', title: 'Refurbished', link: 'https://example.com/refurbished' },
    { icon: 'https://ir.ebaystatic.com/cr/v/c01/05_PopularDestination_Cards.jpg', title: 'Trading cards', link: 'https://example.com/cards' },
    { icon: 'https://ir.ebaystatic.com/cr/v/c01/06_PopularDestination_PreLoved.jpg', title: 'Pre-loved Luxury', link: 'https://example.com/pre-loved' },
    { icon: 'https://ir.ebaystatic.com/cr/v/c01/07_PopularDestination_Toys.jpg', title: 'Toys', link: 'https://example.com/toys' },
  ];

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Trending on eBay</h2>
      <div className="flex space-x-16 overflow-x-auto pb-4">
        {categories.map((category, index) => (
          <TrendingCategory key={index} icon={category.icon} title={category.title} link={category.link} />
        ))}
      </div>
    </div>
  );
};

export default TrendingCategories;
