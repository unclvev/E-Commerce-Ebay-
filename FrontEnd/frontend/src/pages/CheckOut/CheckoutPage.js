import React, { useState, useEffect } from "react";
import { Layout, Radio, Button, Card, Divider, Input, Row, Col, Typography } from "antd";
import { CreditCardOutlined, GoogleOutlined } from '@ant-design/icons';
import axios from 'axios';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import ThankPage from "./ThanksPage";

const { Text } = Typography;

const CheckoutPage = () => {
  const [paymentMethod, setPaymentMethod] = useState("paypal");
  const [cartItems, setCartItems] = useState([]);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  useEffect(() => {
    const checkoutData = JSON.parse(localStorage.getItem("checkout"));

    if (checkoutData && checkoutData.length > 0) {
      const productIds = checkoutData.map(item => item.productId);
      fetchProducts(productIds, checkoutData);
    } else {
      setCartItems([]);
    }
  }, []);

  const fetchProducts = async (productIds, checkoutData) => {
    try {
      const responses = await Promise.all(productIds.map(id =>
        axios.get(`http://localhost:5003/api/Product/products/${id}`)
      ));

      const products = responses.map(response => response.data[0]);

      const updatedItems = checkoutData.map((item) => ({
        ...item,
        product: products.find(product => product.id === item.productId),
      }));

      setCartItems(updatedItems);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  // Lấy tổng số tiền cho đơn hàng
  const orderTotal = cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0) + 131.76;

  if(paymentSuccess == true){
    return(
      <ThankPage></ThankPage>
    )
  }

  return (
    <Layout style={{ padding: '20px' }}>
      <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>Checkout</h1>

      <Row gutter={16}>
        <Col span={16}>
          <Card title="Pay with" style={{ marginBottom: '20px' }}>
            <Radio.Group onChange={handlePaymentChange} value={paymentMethod}>
              <Radio value="paypal" defaultChecked>
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="paypal" style={{ width: '50px' }} /> PayPal
              </Radio>
              <Divider />

              <Radio value="card" disabled>
                <CreditCardOutlined /> Add new card
                <Input placeholder="Card Number" style={{ marginTop: '10px' }} disabled />
                <Text type="secondary" style={{ display: 'block', marginTop: '5px' }}>
                  This feature is not supported.
                </Text>
              </Radio>
              <Divider />

              <Radio value="googlepay" disabled>
                <GoogleOutlined /> Google Pay
                <Text type="secondary" style={{ display: 'block', marginTop: '5px' }}>
                  This feature is not supported.
                </Text>
              </Radio>
            </Radio.Group>
          </Card>

          <Card title="Ship to" style={{ marginBottom: '20px' }}>
            <p>Hoang Long Pham</p>
            <p>Hai Noi</p>
            <p>Nam Dinh, Vietnam 420000</p>
            <p>Phone: 0836650093</p>
            <Button type="link">Change</Button>
          </Card>

          <Card title="Review order" style={{ marginBottom: '20px' }}>
            {cartItems.length > 0 ? cartItems.map((item) => (
              <div key={item.product.id} style={{ display: 'flex', marginBottom: '20px' }}>
                <div style={{ marginRight: '20px' }}>
                  <img width={'150px'} height={'150px'} src={item.product.imageUrl} alt={item.product.name} />
                </div>
                <div>
                  <h4>{item.product.name}</h4>
                  <p>{item.product.description}</p>
                  <p><strong>US ${item.product.price.toFixed(2)}</strong></p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Total: US ${(item.product.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            )) : <p>No items in your cart.</p>}
            <Divider />
          </Card>
        </Col>

        <Col span={8}>
          <Card title="Order Summary" style={{ position: 'sticky', top: '20px' }}>
            <p style={{ display: 'flex', justifyContent: 'space-between' }}>
              Items ({cartItems.length}): <span>US ${cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0).toFixed(2)}</span>
            </p>
            <p style={{ display: 'flex', justifyContent: 'space-between' }}>Shipping: <span>US $131.76</span></p>
            <Divider />
            <p style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
              Order Total: <span>US ${orderTotal.toFixed(2)}</span>
            </p>
            <PayPalScriptProvider options={{ "client-id": "ARO7GvPuRSDUZxc273br14Exmr72L1A616kupBqscsUDpiw1fmnCt-mA-LZKLHkXXQXFrAJvcBTLgtDi" }}>
  <PayPalButtons
    style={{ layout: "vertical" }}
    createOrder={(data, actions) => {
      // Tính tổng số tiền bao gồm giá trị hàng hóa và phí vận chuyển
      const itemsTotal = cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
      console.log(itemsTotal);
      const shippingTotal = 131.76; // Phí vận chuyển
      const totalAmount = itemsTotal + shippingTotal;

      return actions.order.create({
        purchase_units: [{
          amount: {
            value: totalAmount.toFixed(2),  // Gửi tổng số tiền vào PayPal
            breakdown: {
              item_total: {
                currency_code: "USD",
                value: itemsTotal.toFixed(2),
              },
              shipping: {
                currency_code: "USD",
                value: shippingTotal.toFixed(2),
              },
            },
          },
        }],
      });
    }}
    onApprove={(data, actions) => {
      return actions.order.capture().then((details) => {
        // Thanh toán thành công, cập nhật trạng thái
        setPaymentSuccess(true);
      });
    }}
    onError={(err) => {
      console.error("PayPal error", err);
    }}
  />
</PayPalScriptProvider>

          </Card>
        </Col>
      </Row>
    </Layout>
  );
};

export default CheckoutPage;
