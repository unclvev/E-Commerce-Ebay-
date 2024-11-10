import React, { useState, useEffect } from "react";
import MainLayout from "../../layouts/MainLayout";
import { Link } from "react-router-dom";
const CartPage = () => {
  const [cartProducts, setCartProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    
    // Xử lý khi checkout không tồn tại hoặc không đầy đủ
    let checkout = JSON.parse(localStorage.getItem("checkout"));
    if (!checkout) {
      // Nếu checkout chưa tồn tại, khởi tạo với giá trị mặc định là 1
      checkout = cart.map(productId => ({ productId, quantity: 1 }));
      localStorage.setItem("checkout", JSON.stringify(checkout)); // Lưu lại checkout
    } else {
      // Cập nhật lại checkout nếu có sự thay đổi trong giỏ hàng
      cart.forEach(productId => {
        if (!checkout.some(item => item.productId === productId)) {
          checkout.push({ productId, quantity: 1 }); // Thêm sản phẩm mới với quantity = 1
        }
      });
      // Lưu lại checkout đã cập nhật
      localStorage.setItem("checkout", JSON.stringify(checkout));
    }

    if (cart && cart.length > 0) {
      const fetchProducts = async () => {
        try {
          const productPromises = cart.map((productId) =>
            fetch(`http://localhost:5003/api/Product/products/${productId}`)
              .then((response) => response.json())
          );
          
          const productData = await Promise.all(productPromises);
          const flatProductData = productData.flat();
          
          setCartProducts(flatProductData);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching products:", error);
          setLoading(false);
        }
      };

      fetchProducts();
    } else {
      setLoading(false);
    }
  }, []);

  const handleQuantityChange = (productId, newQuantity) => {
    let checkout = JSON.parse(localStorage.getItem("checkout"));
    
    // Cập nhật quantity trong checkout
    const itemIndex = checkout.findIndex(item => item.productId === productId);
    if (itemIndex > -1) {
      checkout[itemIndex].quantity = newQuantity;
      localStorage.setItem("checkout", JSON.stringify(checkout)); // Lưu lại checkout
    }

    // Cập nhật lại giỏ hàng trên giao diện
    setCartProducts(prevProducts => 
      prevProducts.map(product => 
        product.id === productId 
          ? { ...product, quantity: newQuantity } 
          : product
      )
    );
  };

  const handleRemoveFromCart = (productId) => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    let checkout = JSON.parse(localStorage.getItem("checkout"));
    
    const updatedCart = cart.filter(item => item !== productId);
    checkout = checkout.filter(item => item.productId !== productId);
    
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    localStorage.setItem("checkout", JSON.stringify(checkout));

    setCartProducts(updatedCart);
  };


  return (
    <MainLayout>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: "center" }}>
        <div style={{ width: '90%', margin: '20px 0' }}>
          <h2 style={{ fontWeight: 'bold', fontSize: '24px' }}>Shopping Cart</h2>
        </div>

        <div style={{ width: '95%', display: 'flex', justifyContent: 'space-between' }}>
          <div className="productlist" style={{ width: '65%', minHeight: '100px', padding: '10px' }}>
            {loading ? (
              <p>Loading products...</p>
            ) : cartProducts.length === 0 ? (
              <p>No products available</p>
            ) : (
              cartProducts.map((product, index) => {
                // Lấy quantity từ checkout
                const checkoutItem = JSON.parse(localStorage.getItem("checkout")).find(item => item.productId === product.id);
                const quantity = checkoutItem ? checkoutItem.quantity : 1;

                return (
                  <div key={index} className="product" style={{ display: 'flex', flexDirection: 'column', padding: '2px', backgroundColor: 'white', marginBottom: '10px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
                    <div className="product-info" style={{ display: 'flex', marginTop: '10px' }}>
                      <img width={'150px'} height={'150px'} src={product.imageUrl} alt={product.name}></img>
                      <div>
                        <h3 style={{ margin: '0', fontSize: '16px', fontWeight: 'bold' }}>{product.name}</h3>
                        <p style={{ margin: '5px 0', color: 'gray' }}>{product.description}</p>
                      </div>

                      {/* Quantity and Price */}
                      <div className="product-price" style={{ textAlign: 'right', width: '15%' }}>
                        <label htmlFor="quantity">Qty</label>
                        <input 
                          type="number" 
                          id="quantity" 
                          name="quantity" 
                          min="1"
                          value={quantity}
                          onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value))}
                          style={{ width: '60px', height: '35px', textAlign: 'center', borderRadius: '5px', border: '1px solid lightgray', marginLeft: '5px' }} 
                        />
                      </div>

                      {/* Offer */}
                      <div style={{ display: 'flex', flexDirection: 'column', width: '35%' }}>
                        <p style={{ margin: '5px 0', color: 'green', textAlign: 'right' }}>Offer applied: Save up to 60%</p>
                        <p style={{ fontWeight: 'bold', display: 'flex', flexDirection: 'column', textAlign: 'right' }}>
                          <span style={{ textDecoration: 'line-through', color: 'gray' }}>US ${product.originalPrice}</span>{' '}
                          <span style={{ color: 'red' }}>US ${product.price}</span>
                        </p>
                      </div>
                    </div>

                    <button onClick={() => handleRemoveFromCart(product.id)} style={{ marginTop: '10px', backgroundColor: 'red', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px' }}>Remove</button>
                  </div>
                );
              })
            )}
          </div>

          <div className="totalprice" style={{
            width: '30%', height: '255px', padding: '20px', backgroundColor: 'whitesmoke', borderRadius: '10px', marginTop: '10px', position: 'sticky', top: '10px'
          }}>
            <p style={{ margin: '10px 0', display: "flex", justifyContent: 'space-between' }}>Items (2):<p>US $723.94</p> </p>
            <p style={{ margin: '10px 0', display: "flex", justifyContent: 'space-between' }}>Shipping to : <p>US $723.94</p></p>
            <hr />
            <p style={{ fontWeight: '650', fontSize: '18px', display: "flex", justifyContent: 'space-between' }}>Total <p>US $1,446.92</p></p>

            <div>
              {/* Sử dụng Link thay cho button để chuyển hướng */}
              <Link to="/checkout" style={{ width: '100%', height: '35px', backgroundColor: 'brown', color: 'white', borderRadius: '5px', display: 'block', textAlign: 'center', padding: '8px 0' }}>
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CartPage;
