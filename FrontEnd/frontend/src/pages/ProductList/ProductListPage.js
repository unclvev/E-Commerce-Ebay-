import React, { useState } from 'react';
import { Row, Col, Card, Checkbox, Slider, Pagination } from 'antd';
import MainLayout from '../../layouts/MainLayout';

const { Meta } = Card;

const ProductListPage = () => {
  const [priceRange, setPriceRange] = useState([100000, 500000]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 9;
  const products = [
    {
      id: 1,
      name: 'A Fierce Dragon Fantasy Art Mens Cotton T-Shirt',
      price: 359370,
      originalPrice: 500000,
      image: 'https://www.tatgolf.vn/media/catalog/product/cache/4b8a26fd3678cf71135a0bf838b897de/l/e/lecoq_qgwtja16_wwh.jpg',
    },
    {
      id: 2,
      name: 'Disappointments All of You Jesus Faith T-Shirt',
      price: 416633,
      originalPrice: 600000,
      image: 'https://www.tatgolf.vn/media/catalog/product/cache/4b8a26fd3678cf71135a0bf838b897de/a/_/a_o_ngan_tay_lecoq_qgmvja03v_nv02_.jpg',
    },
    {
      id: 3,
      name: 'Mens T-Shirts Plain Cotton Short Sleeve',
      price: 112814,
      originalPrice: 200000,
      image: 'https://www.tatgolf.vn/media/catalog/product/cache/4b8a26fd3678cf71135a0bf838b897de/a/_/a_o_ngan_tay_lecoq_qgmvja03v_nv02_.jpg',
    },
    {
      id: 4,
      name: 'Torn Philippines Flag T-Shirt',
      price: 261271,
      originalPrice: 400000,
      image: 'https://www.tatgolf.vn/media/catalog/product/cache/4b8a26fd3678cf71135a0bf838b897de/a/_/a_o_ngan_tay_lecoq_qgmvja03v_nv02_.jpg',
    },
  ];
  const formatMoney = (amount) => {
    return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  };
  const calculateDiscountPercentage = (price, originalPrice) => {
    return Math.round(((originalPrice - price) / originalPrice) * 100);
  };
  const paginatedProducts = products.slice((currentPage - 1) * pageSize, currentPage * pageSize);

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
                  <Checkbox value="S">Small</Checkbox>
                  <Checkbox value="M">Medium</Checkbox>
                  <Checkbox value="L">Large</Checkbox>
                </Checkbox.Group>
              </div>

              <div className="mb-4">
                <h3 className="text-md font-semibold">Color</h3>
                <Checkbox.Group>
                  <Checkbox value="Black">Black</Checkbox>
                  <Checkbox value="White">White</Checkbox>
                  <Checkbox value="Red">Red</Checkbox>
                </Checkbox.Group>
              </div>
            </div>
          </Col>

          {/* Cột bên phải chứa danh sách sản phẩm */}
          <Col xs={24} sm={18} md={18} lg={18}>
            <Row gutter={[16, 16]}>
              {paginatedProducts.map((product) => (
                <Col xs={24} sm={12} md={8} key={product.id}>
                  <Card
                    hoverable
                    cover={<img alt={product.name} src={product.image} />}
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
                          <div style={{ color: 'green' }}>
                            Discount: {calculateDiscountPercentage(product.price, product.originalPrice)}%
                          </div>
                        </>
                      }
                    />
                  </Card>
                </Col>
              ))}
            </Row>
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={products.length}
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
