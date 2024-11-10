import React, { useState, useEffect } from "react";
import MainLayout from "../../layouts/MainLayout";
import { InputNumber, Button, Tooltip, Select, message } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { useParams } from "react-router-dom";
import axios from "axios";

const { Option } = Select;

export const ProductDetailsPage = () => {
    const { pid } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:5003/api/Product/products/${pid}`);
                setProduct(response.data[0]);
            } catch (error) {
                setError('Failed to fetch product data.');
                console.error("Error fetching product data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [pid]);

    const handleAddToCart = () => {
        // Get existing cart from localStorage or initialize it
        let cart = JSON.parse(localStorage.getItem("cart")) ;

        // If the cart doesn't exist in localStorage, create it
        if (!cart) {
            cart = [];
            localStorage.setItem("cart", JSON.stringify(cart));
        }
        // Check if the product ID already exists in the cart
        if (cart.includes(pid)) {
            message.warning("This item is already in the cart.");
        } else {
            cart.push(pid);
            localStorage.setItem("cart", JSON.stringify(cart));
            message.success("Item added to cart.");
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div style={{ color: 'red' }}>{error}</div>;

    return (
        <MainLayout>
            <div className="product_cpn max-h-[600px] h-full">
                <div className="_container flex">
                    <div className="row1 min-h-[400px] h-full basis-[50%]">
                        {product?.imageUrl && (
                            <img src={product.imageUrl} alt={product.name} style={{ maxWidth: '100%', height: 'auto' }} />
                        )}
                    </div>
                    <div className="row2 bg-white min-h-[400px] h-full basis-[50%] p-4">
                        <div className="product_name">
                            <p className="font-bold font-sans text-2xl">{product.name}</p>
                        </div>

                        <div className="product-details">
                            {product?.description && <p>{product.description}</p>}
                            <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                                <span style={{ fontSize: '24px', fontWeight: 'bold' }}>
                                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
                                </span>
                                &nbsp;
                                {product?.originalPrice && (
                                    <span style={{ textDecoration: 'line-through', marginLeft: '10px' }}>
                                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.originalPrice)}
                                    </span>
                                )}
                                {product?.price && product?.originalPrice && (
                                    <Tooltip title="Discount available due to special promotion">
                                        <Button type="link" icon={<InfoCircleOutlined />} style={{ padding: 0, marginLeft: 5 }}>
                                            {Math.round((1 - product.price / product.originalPrice) * 100)}% off
                                        </Button>
                                    </Tooltip>
                                )}
                            </div>

                            <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center' }}>
                                <span style={{ marginRight: 10 }}>Quantity:</span>
                                <InputNumber min={1} defaultValue={1} style={{ width: 60, textAlign: 'center' }} />
                            </div>

                            <div style={{ marginTop: '20px' }}>
                                <Button type="primary" shape="round" size="large" style={{ width: '100%', marginBottom: '10px' }}>
                                    Buy It Now
                                </Button>
                                <Button
                                    shape="round"
                                    size="large"
                                    style={{ width: '100%', marginBottom: '10px' }}
                                    onClick={handleAddToCart}
                                >
                                    Add to Cart
                                </Button>
                                <Button shape="round" size="large" style={{ width: '100%' }}>
                                    ♥ Add to Watchlist
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};


