import React from "react";
import MainLayout from "../../layouts/MainLayout";
import { InputNumber } from 'antd';
import { Button, Tooltip, Select } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';


const { Option } = Select;

const ProductDetailsPage = () => {
    return (
        <MainLayout>
            <div className="product_cpn max-h-[600px] h-full">
                <div className="breadbar"></div>
                <div className="_container flex">
                    <div className="row1 bg-red-600 min-h-[400px] h-full basis-[50%]">

                    </div>
                    <div className="row2 bg-white min-h-[400px] h-full basis-[50%]">
                        <div className="product_name">
                            <p className="font-bold font-sans text-2xl">Viktoria® Fabric Clothes Tie Dye 59 COLOURS 200 gr Fabric for each pack UK Stock</p>
                        </div>
                        <br></br>
                        <div className="flex border-solid border-y-2 p-4">

                            <img className="rounded-full size-12" src="https://i.ebayimg.com/images/g/FO8AAOSwPwJhTNom/s-l64.jpg" alt=""></img>


                            <div className="flex-col ml-2">
                                <p className="font-semibold">Ada Barza</p>
                                <span className="flex font-medium">
                                    <a>97.8% positive</a>
                                    <p>.</p>
                                    <a>Seller's other item</a>
                                    <p>.</p>
                                    <a>Contract seller</a>
                                </span>
                            </div>
                        </div>
                        <div>
                            <Select
                                style={{ width: '95%', height: '50px', marginLeft: '15px', marginTop: '10px' }}
                                listHeight={200}
                                placeholder="Select an option"

                            >
                                <Option value="option1">Option 1</Option>
                                <Option value="option2">Option 2</Option>
                                <Option value="option3">Option 3</Option>
                                <Option value="option2">Option 2</Option>
                                <Option value="option3">Option 3</Option>
                                <Option value="option2">Option 2</Option>
                                <Option value="option3">Option 3</Option>
                            </Select>

                            <div className="product-details">
                                <div style={{ display: 'flex', alignItems: 'center', height: '45px', marginLeft: '15px', marginTop: '10px' }}>
                                    <span style={{ marginRight: 10 }}>Quantity:</span>
                                    <InputNumber
                                        min={1}
                                        defaultValue={1}
                                        style={{ width: 60, textAlign: 'center' }}
                                    />
                                    <span style={{ marginLeft: 10, color: 'red' }}>Limited quantity available - 3,217 sold</span>
                                </div>
                            </div>
                        </div>

                        <div className="product-details" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "95%", marginLeft: '15px', marginTop: '10px' }}>
                            <div style={{ marginBottom: 20, width: '50%' }}>
                                <p style={{ fontSize: '24px', fontWeight: 'bold' }}>US $709.99</p>
                                <p>Approximately 17,316,829.27 VND (US $518.24 / oz)</p>
                                <div style={{ display: 'flex', alignItems: 'start', flexDirection: 'column' }}>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <p style={{ textDecoration: 'line-through' }}>List price US $1,299.00</p>
                                        <Tooltip title="Discount available due to special promotion">
                                            <Button type="link" icon={<InfoCircleOutlined />} style={{ padding: 0, marginLeft: 5 }}>
                                                (45% off)
                                            </Button>
                                        </Tooltip>
                                    </div>

                                    <a style={{ marginLeft: 0, color: 'blue' }}>Price details</a>
                                </div>
                            </div>

                            <div style={{ width: '50%' }}>
                                <Button type="primary" shape="round" size="large" style={{ width: 330, marginRight: 10 }}>
                                    Buy It Now
                                </Button>
                                <Button shape="round" size="large" style={{ width: 330, marginRight: 10, marginTop: 10 }}>
                                    Add to cart
                                </Button>
                                <Button shape="round" size="large" style={{ width: 330, marginTop: 10 }}>
                                    ♥ Add to watchlist
                                </Button>
                            </div>
                        </div>

                        <div>
                            <div className="trending rounded-full ml-2" style={{ width: '100%', backgroundColor: 'lightgray', height: '50px' }}>

                            </div>

                            <div className="othersinfo">

                            </div>
                        </div>

                    </div>
                </div>
            </div>


        </MainLayout>
    )
}

export default ProductDetailsPage;