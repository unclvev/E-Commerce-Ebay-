import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Row, Col, Card, Slider, Pagination, Checkbox } from 'antd';
import MainLayout from '../../layouts/MainLayout';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const { Meta } = Card;

const ProductListPage = () => {
  const [categories, setCategories] = useState([]);
  const [currentCategoryProducts, setCurrentCategoryProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [priceRange, setPriceRange] = useState([100000, 500000]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState([]);
  const [selectedColor, setSelectedColor] = useState([]);
  const [availableSizes, setAvailableSizes] = useState([]);
  const [availableColors, setAvailableColors] = useState([]);
  const [categoryId, setCategoryId] = useState(null);
  const { categoryId: categoryParam } = useParams();
  const pageSize = 9;

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get('category');
  const keyword = searchParams.get('keyword');
  useEffect(() => {
    if (categoryParam) {
      setCategoryId(categoryParam);
    }
  }, [categoryParam]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Cứng categoryId = 2
        const response = await axios.get('http://localhost:5003/api/Product/category/2');
        console.log("API Response:", response.data); 
        setAvailableSizes(response.data.availableSizes);
        setAvailableColors(response.data.availableColors);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    fetchData();
  }, []); 

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      setCurrentCategoryProducts([]);
  
      try {
        const response = await axios.get('http://localhost:5003/api/product/search', {
          params: { category: category || '', keyword: keyword || '' }
        });
  
        if (response.data && response.data.length > 0) {
          setCurrentCategoryProducts(response.data);
        } else {
          setError('No products found for this search.');
          setCurrentCategoryProducts([]);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to fetch products. Please try again later.');
        setCurrentCategoryProducts([]);
      } finally {
        setLoading(false);
      }
    };
  
    fetchProducts();
  }, [category, keyword]);
  const formatMoney = (amount) => {
    return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  };

  const calculateDiscountPercentage = (price, originalPrice) => {
    if (originalPrice > 0) {
      return Math.round(((originalPrice - price) / originalPrice) * 100);
    }
    return 0;
  };

  const paginatedProducts = currentCategoryProducts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleSizeChange = (checkedValues) => {
    setSelectedSize(checkedValues);
  };

  const handleColorChange = (checkedValues) => {
    setSelectedColor(checkedValues);
  };
  return (
    <MainLayout>
      <div className="container mx-auto py-10">
        <Row gutter={16}>
          <Col xs={24} sm={6} md={6} lg={6}>
            <div className="bg-white p-4 shadow-md">
              <h2 className="text-xl font-bold mb-4">Filters</h2>
              <div className="mb-4">
                <h3 className="text-md font-semibold">Price Range</h3>
                <Slider
                  range
                  min={0}
                  max={1000000}
                  step={10000}
                  defaultValue={priceRange}
                  onChange={(value) => setPriceRange(value)}
                />
              </div>

              <div className="mb-4">

                <h3 className="text-md font-semibold">Size</h3>
                <Checkbox.Group>
                  {availableSizes.length > 0 ? (
                    availableSizes.map((size) => (
                      <Checkbox key={size} value={size}>{size}</Checkbox>
                    ))
                  ) : (
                    <p>No sizes available</p>
                  )}
                </Checkbox.Group>
              </div>

              <div className="mb-4">
                <h3 className="text-md font-semibold">Color</h3>
                <Checkbox.Group>
                  {availableColors.length > 0 ? (
                    availableColors.map((color) => (
                      <Checkbox key={color} value={color}>{color}</Checkbox>
                    ))
                  ) : (
                    <p>No colors available</p>
                  )}

                </Checkbox.Group>
              </div>

            </div>
          </Col>
          <Col xs={24} sm={18} md={18} lg={18}>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <Row gutter={[16, 16]}>
              {paginatedProducts.length > 0 ? (
                paginatedProducts.map((product, index) => (
                  <Col xs={24} sm={12} md={8} key={index}>
                    <Card
                      hoverable
                      cover={<img alt={product.name} src={product.imageUrl} />}
                    >
                      <Meta
                        title={product.name}
                        description={
                          <>
                            <div>
                              <span style={{ color: 'red', fontWeight: 'bold' }}>
                                {formatMoney(product.price)}
                              </span>
                              &nbsp;
                              <span style={{ textDecoration: 'line-through', marginLeft: '8px' }}>
                                {formatMoney(product.originalPrice)}
                              </span>
                            </div>
                            <p>{product.description}</p>
                            <p style={{ color: 'green', fontWeight: 'bold' }}>
                              Discount: {calculateDiscountPercentage(product.price, product.originalPrice)}%
                            </p>
                          </>
                        }
                      />
                    </Card>
                  </Col>
                ))
              ) : (
                !error && <Col span={24}>No products found in this category</Col>
              )}
            </Row>

            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={currentCategoryProducts.length}
              onChange={(page) => setCurrentPage(page)}
              className="mt-4"
            />
          </Col>
        </Row>
      </div>
    </MainLayout>
  );
};

export default ProductListPage;
