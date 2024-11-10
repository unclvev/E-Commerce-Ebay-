import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Row, Col, Card, Slider, Pagination, Checkbox } from 'antd';
import MainLayout from '../../layouts/MainLayout';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const { Meta } = Card;

const ProductListPage = () => {
  const [categories, setCategories] = useState([]);
  const [currentCategoryProducts, setCurrentCategoryProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [priceRange, setPriceRange] = useState([100000, 50000000]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState([]);
  const [selectedColor, setSelectedColor] = useState([]);
  const [selectedStore, setSelectedStore] = useState([]);
  const [availableSizes, setAvailableSizes] = useState([]);
  const [availableColors, setAvailableColors] = useState([]);
  const [availableStores, setAvailableStores] = useState([]);
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
        const response = await axios.get('http://localhost:5003/api/product/search', {
          params: { category: category || '', keyword: keyword || '' },
        });
        const data = response.data;
        console.log(data);
        if (data && data.length > 0) {
          setCategories(data);
          const products = data.flatMap((category) => category.products);
          setCurrentCategoryProducts(products);
          console.log(products)
          console.log(currentCategoryProducts);
          setAvailableSizes(data.flatMap((cat) => cat.availableSizes).filter(Boolean));
          setAvailableColors(data.flatMap((cat) => cat.availableColors).filter(Boolean));
          setAvailableStores(data.flatMap((cat) => cat.availableStores).filter(Boolean));
        } else {
          setError('No products found for this search.');
          setCurrentCategoryProducts([]);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to fetch products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [category, keyword]);

  // Hàm lọc sản phẩm theo size, color, store và price range
  const filterProducts = (products) => {
    return products.filter((product) => {
      // Kiểm tra size nếu có size được chọn
      const sizeMatch =
        selectedSize.length === 0 || product.sizes.some((size) => selectedSize.includes(size.sizeName));

      // Kiểm tra color nếu có color được chọn
      const colorMatch =
        selectedColor.length === 0 || product.colors.some((color) => selectedColor.includes(color.colorName));

      // Kiểm tra store nếu có store được chọn
      const storeMatch =
        selectedStore.length === 0 || product.stores.some((store) => selectedStore.includes(store.storeName));

      // Kiểm tra khoảng giá
      const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];

      // Chỉ trả về sản phẩm nếu tất cả điều kiện đều thỏa mãn
      return sizeMatch && colorMatch && storeMatch && priceMatch;
    });
  };

  // Áp dụng bộ lọc
  const filteredProducts = filterProducts(currentCategoryProducts);

  // // Phân trang sau khi đã lọc sản phẩm
  // const paginatedProducts = filteredProducts.slice(
  //   (currentPage - 1) * pageSize,
  //   currentPage * pageSize
  // );

  const formatMoney = (amount) => {
    if (amount === undefined || amount === null) {
      return '0 đ'; // Giá trị mặc định
    }
    return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  };

  const calculateDiscountPercentage = (price, originalPrice) => {
    if (originalPrice > 0) {
      return Math.round(((originalPrice - price) / originalPrice) * 100);
    }
    return 0;
  };

  const handleSizeChange = (checkedValues) => {
    setSelectedSize(checkedValues);
  };

  const handleColorChange = (checkedValues) => {
    setSelectedColor(checkedValues);
  };

  const handleStoreChange = (checkedValues) => {
    setSelectedStore(checkedValues);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
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
                <Checkbox.Group onChange={handleSizeChange}>
                  {availableSizes.length > 0 ? (
                    availableSizes.map((size) => (
                      <Checkbox key={size} value={size}>
                        {size}
                      </Checkbox>
                    ))
                  ) : (
                    <p>No sizes available</p>
                  )}
                </Checkbox.Group>
              </div>

              <div className="mb-4">
                <h3 className="text-md font-semibold">Color</h3>
                <Checkbox.Group onChange={handleColorChange}>
                  {availableColors.length > 0 ? (
                    availableColors.map((color) => (
                      <Checkbox key={color} value={color}>
                        {color}
                      </Checkbox>
                    ))
                  ) : (
                    <p>No colors available</p>
                  )}
                </Checkbox.Group>
              </div>

              <div className="mb-4">
                <h3 className="text-md font-semibold">Store</h3>
                <Checkbox.Group onChange={handleStoreChange}>
                  {availableStores.length > 0 ? (
                    availableStores.map((store) => (
                      <Checkbox key={store} value={store}>
                        {store}
                      </Checkbox>
                    ))
                  ) : (
                    <p>No stores available</p>
                  )}
                </Checkbox.Group>
              </div>
            </div>
          </Col>

          <Col xs={24} sm={18} md={18} lg={18}>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <Row gutter={[16, 16]}>
  {currentCategoryProducts.length > 0 ? (
    currentCategoryProducts.map((product, index) => (
      <Col xs={24} sm={12} md={8} key={index}>
        <Link to={`/products/${product.id}`}>
          <Card
            hoverable
            cover={
              <img
                alt={product.name}
                src={product.imageUrl || 'http://example.com/images/default-product.jpg'} // Ảnh mặc định nếu không có ảnh
              />
            }
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
                    {product.originalPrice > 0 && (
                      <span style={{ textDecoration: 'line-through', marginLeft: '8px' }}>
                        {formatMoney(product.originalPrice)}
                      </span>
                    )}
                  </div>
                  <p>{product.description || 'No description available'}</p>
                  {product.originalPrice > 0 && (
                    <p style={{ color: 'green', fontWeight: 'bold' }}>
                      Discount: {calculateDiscountPercentage(product.price, product.originalPrice)}%
                    </p>
                  )}
                </>
              }
            />
          </Card>
        </Link>
      </Col>
    ))
  ) : (
    <Col span={24}>No products found for this category.</Col>
  )}
</Row>


            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={filteredProducts.length}
              onChange={(page) => setCurrentPage(page)}
              className="mt-4"
            />
          </Col>
        </Row>
      </div>
  );
};

export default ProductListPage;