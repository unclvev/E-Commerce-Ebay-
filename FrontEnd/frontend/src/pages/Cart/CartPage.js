import React, { useState, useEffect } from "react";
import MainLayout from "../../layouts/MainLayout";

const CartPage = () => {
  const [cartProducts, setCartProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get cart from localStorage
    const cart = JSON.parse(localStorage.getItem("cart"));
    
    if (cart && cart.length > 0) {
      // Fetch products based on cart IDs
      const fetchProducts = async () => {
        try {
          const productPromises = cart.map((productId) =>
            fetch(`http://localhost:5003/api/Product/products/${productId}`)
              .then((response) => response.json())
          );
          
          const productData = await Promise.all(productPromises);
          
          // Flatten the product data from arrays to a single array
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

  return (
    <MainLayout>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: "center" }}>
        <div style={{ width: '90%', margin: '20px 0' }}>
          <h2 style={{ fontWeight: 'bold', fontSize: '24px' }}>Shopping Cart</h2>
        </div>

        <div style={{ width: '95%', display: 'flex', justifyContent: 'space-between' }}>
          {/* Product List */}
          <div className="productlist" style={{ width: '65%', minHeight: '100px', padding: '10px' }}>
            {loading ? (
              <p>Loading products...</p>
            ) : cartProducts.length === 0 ? (
              <p>No products available</p>
            ) : (
              cartProducts.map((product, index) => (
                <div key={index} className="product" style={{ display: 'flex', flexDirection: 'column', padding: '2px', backgroundColor: 'white', marginBottom: '10px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
                  {/* Seller Info */}
                  <div className="seller" style={{ width: '100%', marginRight: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ width: '60%', marginRight: '20px', display: 'flex', alignItems: 'center' }}>
                      <img style={{ width: '40px', height: '40px', borderRadius: '50%' }} src="https://i.ebayimg.com/images/g/-5YAAOSwBLlVOqUW/s-l225.webp" alt="selleravatar"></img>
                      <div style={{ margin: '5px 5px 0' }}>
                        <span style={{ fontSize: '14px', color: 'black', fontWeight: '600' }}>guaranteecellular</span>
                        <span style={{ fontSize: '13px', color: 'gray', display: 'block' }}>99.9% positive feedback</span>
                      </div>
                    </div>

                    <div>
                      <a href="#" style={{ width: '40%', color: 'brown' }}>pay only this seller</a>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="product-info" style={{ display: 'flex', marginTop: '10px' }}>
                    <img width={'150px'} height={'150px'} src={product.imageUrl} alt={product.name}></img>
                    <div>
                      <h3 style={{ margin: '0', fontSize: '16px', fontWeight: 'bold' }}>{product.name}</h3>
                      <p style={{ margin: '5px 0', color: 'gray' }}>{product.description}</p>
                    </div>

                    {/* Quantity and Price */}
                    <div className="product-price" style={{ textAlign: 'right', width: '15%' }}>
                      <label htmlFor="quantity">Qty</label>
                      <input type="number" id="quantity" name="quantity" min="1" style={{ width: '60px', height: '35px', textAlign: 'center', borderRadius: '5px', border: '1px solid lightgray', marginLeft: '5px' }} />
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
                </div>
              ))
            )}
          </div>

          {/* Total Price Section */}
          <div className="totalprice" style={{
            width: '30%', height: '255px', padding: '20px', backgroundColor: 'whitesmoke', borderRadius: '10px', marginTop: '10px', position: 'sticky', top: '10px'
          }}>
            <p style={{ margin: '10px 0', display: "flex", justifyContent: 'space-between' }}>Items (2):<p>US $723.94</p> </p>
            <p style={{ margin: '10px 0', display: "flex", justifyContent: 'space-between' }}>Shipping to : <p>US $723.94</p></p>
            <hr />
            <p style={{ fontWeight: '650', fontSize: '18px', display: "flex", justifyContent: 'space-between' }}>Subtotal: <p>US $855.70</p></p>
            <button style={{ width: '100%', padding: '10px', backgroundColor: '#0046be', color: 'white', fontWeight: '650', border: 'none', borderRadius: '15px', marginTop: '20px' }}>
              Go to checkout
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CartPage;
