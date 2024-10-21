// src/App.js
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CartPage from './pages/Cart/CartPage';
import CheckoutPage from './pages/CheckOut/CheckoutPage';
import HomePage from './pages/Home/HomePage';
import NotFoundPage from './pages/NotFound/NotFoundPage';
import RegistrationForm from './pages/Authentication/Register';
import LoginPage from './pages/Authentication/login';
import ProductDetailPage from './pages/ProductDetails/ProductDetailsPage';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path='/sign-up' element={<RegistrationForm />} />
        <Route path='/sign-in' element={<LoginPage />} />

        <Route path='/product' element={<ProductDetailPage />} />
        <Route path='/cart' element={<CartPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
