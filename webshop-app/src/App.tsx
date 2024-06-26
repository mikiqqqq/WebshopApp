import React, { useState, useEffect, useCallback } from 'react';
import { Route, Routes, useLocation, useSearchParams } from 'react-router-dom';
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
import ItemService from './services/ItemService';
import { FilterOptions, Product } from './components/MainContainerData';

const defaultFilterOptions: FilterOptions = {
  brandIds: [],
  uprLmt: 15000,
  lwrLmt: 0,
  productTypeId: 0,
  productionYear: 0,
  sortBy: "NAME",
  sortOrder: "ASC"
};

function App() {
  const [items, setItems] = useState<Product[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>(defaultFilterOptions);
  const [resetFilters, setResetFilters] = useState<boolean>(false);
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const fetchItems = useCallback(() => {
    const search = searchParams.get('search');
    if (search) {
      ItemService.findAllThatContainTarget(search).then((response) => {
        setItems(response.data);
        setError(false);
      }).catch(() => setError(true));
    } else {
      ItemService.filterItems(filterOptions).then((response) => {
        setItems(response.data);
        setError(false);
      }).catch(() => setError(true));
    }
  }, [filterOptions, searchParams]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleFilterOptionsChange = (newFilterOptions: FilterOptions) => {
    setFilterOptions(newFilterOptions);
  };

  const handleClearAll = () => {
    setFilterOptions(defaultFilterOptions);
    setSearchParams({});
    setResetFilters(true); // Trigger reset
  };

  useEffect(() => {
    if (resetFilters) {
      setResetFilters(false); // Reset the trigger after it has been handled
    }
  }, [resetFilters]);

  return (
      <div className="page">
        <AnnouncementBar />
        <Header />
        {location.pathname === '/' && (
          <FixedSidebar 
            filterOptions={filterOptions}
            onFilterOptions={handleFilterOptionsChange}
            reset={resetFilters}
          />
        )}
        <div className="scrollbar_placeholder"></div>
        <Routes>
          <Route path="/" element={<MainContainer items={items} error={error} onClearAll={handleClearAll} />} />
          <Route path="/products/*" element={<ProductDetail />} />
          <Route path="/cart" element={<ShoppingCart />} />
          <Route path="/checkout" element={<Checkout />} />
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
}

export default App;