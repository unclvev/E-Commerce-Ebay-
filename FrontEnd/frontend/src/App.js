// src/App.js
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CartPage from './pages/Cart/CartPage';
import CheckoutPage from './pages/CheckOut/CheckoutPage';
import HomePage from './pages/Home/HomePage';
import NotFoundPage from './pages/NotFound/NotFoundPage';
import RegistrationForm from './pages/Authentication/register';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path='/auth' element={<RegistrationForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
