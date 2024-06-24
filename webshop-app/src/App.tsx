import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Checkout from './components/checkout/Checkout';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import MainContainer from './components/MainContainer';
import ShoppingCart from './components/shopping_cart/ShoppingCart';
import Support from './components/support/Support';
import WrongRoute from './components/wrong_route/WrongRoute';
import useLocalStorage from './useLocalStorage';
import PrivateRoute from './components/private_route/PrivateRoute';
import Login from './components/login/Login';
import Register from './components/register/Register';
import Account from './components/header/account/Account';
import Admin from './components/header/account/admin/Admin';
import ProductDetail from './components/product_detail/ProductDetail';  

function App() {
  const [orderCompleted, setOrderCompleted] = useState(false);

  useEffect(() => {
    if (orderCompleted) {
    }
  }, [orderCompleted]);

  return (
    <BrowserRouter>
      <div className="page">
        <Header />
        <Routes>
          <Route path="/" element={<MainContainer />} />
          <Route path="/products/*" element={<ProductDetail />} />
          <Route path="/cart" element={<ShoppingCart/>} />
          <Route path="/checkout" element={<Checkout
            orderCompleted={setOrderCompleted}
          />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account/*" element={<PrivateRoute component={Account} roles={['USER', 'ADMIN']} authPath="/login" redirectPath="/" />} />
          <Route path="/admin" element={<PrivateRoute component={Admin} roles={['ADMIN']} authPath="/" redirectPath="/" />} />
          <Route path="*" element={<WrongRoute />} />
        </Routes>
        <Support />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;