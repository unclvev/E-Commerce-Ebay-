import React, { useState } from "react";
import { Layout, Radio, Button, Card, Divider, Input, Select, Row, Col } from "antd";
import { CreditCardOutlined, GoogleOutlined } from '@ant-design/icons';


const { Option } = Select;

const CheckoutPage = () => {
  const [paymentMethod, setPaymentMethod] = useState(null);

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  return (
    <Layout style={{ padding: '20px' }}>
      <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>Checkout</h1>

      <Row gutter={16}>
        {/* Phần Payment */}
        <Col span={16}>
          <Card title="Pay with" style={{ marginBottom: '20px' }}>
            <Radio.Group onChange={handlePaymentChange} value={paymentMethod}>
              <Radio value="paypal">
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="paypal" style={{ width: '50px' }} /> PayPal
              </Radio>
              <Divider />

              <Radio value="card">
                <CreditCardOutlined /> Add new card
                <Input placeholder="Card Number" style={{ marginTop: '10px' }} />
              </Radio>
              <Divider />
              <Radio value="googlepay">
                <GoogleOutlined /> Google Pay
              </Radio>
            </Radio.Group>
          </Card>

          {/* Phần địa chỉ giao hàng */}
          <Card title="Ship to" style={{ marginBottom: '20px' }}>
            <p>Hoang Long Pham</p>
            <p>Hai Noi</p>
            <p>Nam Dinh, Vietnam 420000</p>
            <p>Phone: 0836650093</p>
            <Button type="link">Change</Button>
          </Card>

          {/* Phần xem lại đơn hàng */}
          <Card title="Review order" style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex' }}>
              <div>
                <img width={'150px'} height={'150px'} src="https://i.ebayimg.com/images/g/MtEAAOSwNGpm14Kx/s-l225.webp"></img>
              </div>
              <div>
                <h4>Seller: 1-perfumes</h4>
                <p>Milk_Shake Silver Shine, 8.4 oz Conditioner</p>
                <p><strong>US $13.95</strong></p>
                <Input type="number" min="1" defaultValue="1" style={{ width: '60px' }} /> <Button type="link">Remove</Button>

              </div>

            </div>
            <Divider />

            <div style={{ display: 'flex' }}>
              <div>
                <img width={'150px'} height={'150px'} src="https://i.ebayimg.com/images/g/MtEAAOSwNGpm14Kx/s-l225.webp"></img>
              </div>
              <div>
                <h4>Seller: 1-perfumes</h4>
                <p>Milk_Shake Silver Shine, 8.4 oz Conditioner</p>
                <p><strong>US $13.95</strong></p>
                <Input type="number" min="1" defaultValue="1" style={{ width: '60px' }} /> <Button type="link">Remove</Button>

              </div>

            </div>
            <Divider />

          </Card>
        </Col>

        {/* Phần Tổng tiền */}

        <Col span={8}>
          <Card title="Order Summary" style={{
            position: 'sticky',
            top: '20px'  // Đặt khoảng cách từ đầu trang khi dính
          }}>
            <p style={{ display: 'flex', justifyContent: 'space-between' }}>Items (2): <span>US $723.94</span></p>
            <p style={{ display: 'flex', justifyContent: 'space-between' }}>Shipping: <span>US $131.76</span></p>
            <Divider />
            <p style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>Order Total: <span>US $855.70</span></p>
            <Button type="primary" style={{ width: '100%', marginTop: '10px' }}>
              Confirm and Pay
            </Button>
          </Card>
        </Col>


      </Row>
    </Layout>
  );
};

export default CheckoutPage;
