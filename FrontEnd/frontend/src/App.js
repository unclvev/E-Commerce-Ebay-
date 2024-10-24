// src/App.js
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { default as BusinessRegistrationForm, default as RegistrationForm } from './pages/Authentication/Register';
import LoginPage from './pages/Authentication/login';
import CartPage from './pages/Cart/CartPage';
import CheckoutPage from './pages/CheckOut/CheckoutPage';
import HomePage from './pages/Home/HomePage';
import NotFoundPage from './pages/NotFound/NotFoundPage';
import SellerDashboard from './pages/Seller/Dashboard';
import ManageOrder from './pages/Seller/ManageOrder';
import ManageProducts from './pages/Seller/ManageProduct';
import Promotion from './pages/Seller/Promotion';
import StoreManagement from './pages/Seller/StoreManagement';
import ProductDetailPage from './pages/ProductDetails/ProductDetailsPage';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/auth" element={<BusinessRegistrationForm></BusinessRegistrationForm>} />
        <Route path='/sign-up' element={<RegistrationForm />} />
        <Route path='/sign-in' element={<LoginPage />} />
        <Route path='/seller/dashboard' element={<SellerDashboard />}></Route>
        <Route path='/seller/product' element={<ManageProducts />}></Route>
        <Route path='/seller/order' element={<ManageOrder />}></Route>
        <Route path='/seller/promotion' element={<Promotion />}></Route>
        <Route path='/seller/store' element={<StoreManagement />}></Route>

        <Route path='/product' element={<ProductDetailPage />} />
        <Route path='/cart' element={<CartPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
