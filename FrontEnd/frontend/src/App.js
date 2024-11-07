// src/App.js
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { default as BusinessRegistrationForm, default as RegistrationForm } from './pages/Authentication/Register';
import LoginPage from './pages/Authentication/login';
import CartPage from './pages/Cart/CartPage';
import CheckoutPage from './pages/CheckOut/CheckoutPage';
import HomePage from './pages/Home/HomePage';
import NotFoundPage from './pages/NotFound/NotFoundPage';
import ProductDetailPage from './pages/ProductDetails/ProductDetailsPage';
import ProfilePage from './pages/Profile/ProfilePage';
import SellerDashboard from './pages/Seller/Dashboard';
import ManageOrder from './pages/Seller/ManageOrder';
import ManageProducts from './pages/Seller/ManageProduct';
import Promotion from './pages/Seller/Promotion';
import StoreManagement from './pages/Seller/StoreManagement';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/auth" element={<BusinessRegistrationForm />} />
        <Route path='/sign-up' element={<RegistrationForm />} />
        <Route path='/sign-in' element={<LoginPage />} />
        <Route path='/seller/dashboard' element={<SellerDashboard />} />
        <Route path='/seller/product' element={<ManageProducts />} />
        <Route path='/seller/order' element={<ManageOrder />} />
        <Route path='/seller/promotion' element={<Promotion />} />
        <Route path='/seller/store' element={<StoreManagement />} />
        <Route path='/product' element={<ProductDetailPage />} />

        {/* Add the route for the ProfilePage */}
        <Route path="/profile/:userId" element={<ProfilePage />} />
        {/* <Route path="/change-password/:userId" element={<ChangePasswordPage />} /> */}

      </Routes>
    </BrowserRouter>
  );
}

export default App;
