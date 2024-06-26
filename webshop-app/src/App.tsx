import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Checkout from './components/checkout/Checkout';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import MainContainer from './components/MainContainer';
import ShoppingCart from './components/shopping_cart/ShoppingCart';
import Support from './components/support/Support';
import WrongRoute from './components/wrong_route/WrongRoute';
import PrivateRoute from './components/private_route/PrivateRoute';
import Login from './components/login/Login';
import Register from './components/register/Register';
import Account from './components/header/account/Account';
import Admin from './components/header/account/admin/Admin';
import ProductDetail from './components/product_detail/ProductDetail';
import AnnouncementBar from './components/announcement_bar/AnnouncementBar';
import FixedSidebar from './components/fixed_sidebar/FixedSidebar';
import { FilterOptions, Product } from './components/MainContainerData';
import ItemService from './services/ItemService';

const App: React.FC = () => {
  const [orderCompleted, setOrderCompleted] = useState(false);
  const defaultFilterOptions: FilterOptions = {
    brandIds: [],
    uprLmt: 15000,
    lwrLmt: 0,
    productTypeId: 0,
    productionYear: 0,
    sortBy: "NAME",
    sortOrder: "ASC"
  };
  const [filterOptions, setFilterOptions] = useState<FilterOptions>(defaultFilterOptions);
  const [resetFilters, setResetFilters] = useState(false); // Add state for reset action
  const [items, setItems] = useState<Array<Product>>([]);
  const [error, setError] = useState(true);

  const handleClearAll = () => {
    setFilterOptions(defaultFilterOptions);
    setResetFilters(true); // Trigger reset
  };

  const handleFilterOptionsChange = (newFilterOptions: FilterOptions) => {
    setFilterOptions(newFilterOptions);
  };

  useEffect(() => {
    if (resetFilters) {
      setResetFilters(false); // Reset the trigger after it has been handled
    }
  }, [resetFilters]);

  useEffect(() => {
    ItemService.filterItems(filterOptions).then((response) => {
      setItems(response.data);
      setError(false);
      console.log(response.data);
    }).catch(() => setError(true));
  }, [filterOptions]);

  const location = useLocation();

  return (
    <div className="page">
      <AnnouncementBar />
      <Header />
      {location.pathname === '/' && (
        <FixedSidebar 
          filterOptions={filterOptions} 
          onFilterOptions={handleFilterOptionsChange} 
          onClearAll={handleClearAll} 
          reset={resetFilters} // Pass down reset state
        />
      )}
      <Routes>
        <Route path="/" element={<MainContainer items={items} error={error} />} />
        <Route path="/products/*" element={<ProductDetail />} />
        <Route path="/cart" element={<ShoppingCart />} />
        <Route path="/checkout" element={<Checkout orderCompleted={setOrderCompleted} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/account/*" element={<PrivateRoute component={Account} roles={['USER', 'ADMIN']} authPath="/login" redirectPath="/" />} />
        <Route path="/admin" element={<PrivateRoute component={Admin} roles={['ADMIN']} authPath="/" redirectPath="/" />} />
        <Route path="*" element={<WrongRoute />} />
      </Routes>
      <Support />
      <Footer />
    </div>
  );
};

const AppWithRouter: React.FC = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default AppWithRouter;