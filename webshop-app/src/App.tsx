// src/App.tsx

import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Checkout from './components/checkout/Checkout';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import MainContainer from './components/MainContainer';
import { Product, AddProduct } from './components/MainContainerData';
import ShoppingCart from './components/shopping_cart/ShoppingCart';
import Support from './components/support/Support';
import WrongRoute from './components/wrong_route/WrongRoute';
import DiscountCodeService from './services/DiscountCodeService';
import ItemService from './services/ItemService';
import OrderItemService from './services/OrderItemService';
import OrderService from './services/OrderService';
import useLocalStorage from './useLocalStorage';
import PrivateRoute from './components/private_route/PrivateRoute';
import Login from './components/login/Login';
import Register from './components/register/Register';
import Account from './components/header/account/Account';
import Admin from './components/header/account/admin/Admin';

interface OrderItemAndAmount {
  id: number;
  quantity: number;
}

function App() {
  const [discountCode, setDiscountCode] = useState('');
  const [orderItems, setOrderItems] = useState<Array<Product>>([]);
  const [updateOrderItems, setUpdateOrderItems] = useState(false);
  const [localStateActiveOrder, setLocalStateActiveOrder] = useLocalStorage('activeOrder');
  const [firstAdded, setFirstAdded] = useState(true);
  const [error, setError] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);

  let activeOrderId: number;
  let orderItemsArray = new Array<Product>();
  let orderItemAndAmount = new Array<OrderItemAndAmount>();

  useEffect(() => {
    fetchActiveDiscountCode();
    if(localStateActiveOrder) {
      setFirstAdded(false);
      getOrderItems();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateOrderItems]);

  useEffect(() => {
    if(orderCompleted){
      setOrderItems([]);
      setLocalStateActiveOrder(0);
      setFirstAdded(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderCompleted])

  const fetchActiveDiscountCode = () => {
    DiscountCodeService.fetchActiveDiscountCode().then((response) => {
      setDiscountCode(response.data.code);
      setError(false);
    }).catch(() => {
      setError(true);
  });
  }
  
  const getOrderItems = async () => {
    try{
    orderItemAndAmount = (await OrderItemService.getOrderItemAmount(localStateActiveOrder)).data;
    // If every orderItem is deleted
    if(orderItemAndAmount.length === 0) {
      OrderService.deleteOrder(localStateActiveOrder);
      setOrderItems([]);
      setLocalStateActiveOrder(0);
      setFirstAdded(true);
      return;
    }
    orderItemsArray = (await ItemService.findItemByItemId(orderItemAndAmount.map(item => item.id))).data;

    setOrderItems(orderItemsArray.map(item =>
      ({ ...item, ...orderItemAndAmount.find(orderItem => orderItem.id === item.id) }))
    );
    }catch (err: unknown) {
      console.log(err);
    }
  }

  const addItemToTheCart = async (item: AddProduct) => {
    if (firstAdded) {
      const response = await OrderService.createOrder();
      activeOrderId = response.data.id;
      setLocalStateActiveOrder(activeOrderId);
      if(item.amount > 1) await OrderItemService.createMultipleOrderItems(activeOrderId, item.productId, item.amount);
      else await OrderItemService.createOrderItem(activeOrderId, item.productId);
      setFirstAdded(false);
    } else {
      if(item.amount > 1) await OrderItemService.createMultipleOrderItems(localStateActiveOrder, item.productId, item.amount);
      else await OrderItemService.createOrderItem(localStateActiveOrder, item.productId);
    }
    setUpdateOrderItems(!updateOrderItems);
  }

  const addOrRemoveOrderItem = async (itemId: number, decider: number) => {
    if(decider) await OrderItemService.createOrderItem(localStateActiveOrder, itemId);
    else await OrderItemService.deleteOrderItem(localStateActiveOrder, itemId);
    setUpdateOrderItems(!updateOrderItems);
  }

  const emptyShoppingCart = async (empty: boolean) => {
    if(empty){
      await OrderItemService.deleteAllOrderItemsByOrderId(localStateActiveOrder);
      setUpdateOrderItems(!updateOrderItems);
    }
  }

  const removeOrderItemAll = async (itemId: number) => {
    await OrderItemService.deleteOrderItemAll(itemId, localStateActiveOrder);
    setUpdateOrderItems(!updateOrderItems);
  }

  return (
    <BrowserRouter>
      <div className="page">
        <Header discount={discountCode} activeOrder={localStateActiveOrder} orderItems={orderItems} error={error}/>
        <Routes> 
          <Route path="/tech" element={<MainContainer addItemToCart={addItemToTheCart} />} />
          <Route path="/shopping_cart" element={<ShoppingCart activeOrder={localStateActiveOrder} orderItems={orderItems} 
          removeOrderItemAll={removeOrderItemAll} addOrRemoveOrderItem={addOrRemoveOrderItem} emptyShoppingCart={emptyShoppingCart}/>} />
          <Route path="/checkout" element={<Checkout activeOrder={localStateActiveOrder} orderItems={orderItems} 
          removeOrderItemAll={removeOrderItemAll} addOrRemoveOrderItem={addOrRemoveOrderItem} orderCompleted={setOrderCompleted}/>} />
          <Route path="/login" element={<Login />} />   
          <Route path="/register" element={<Register />} />             
          <Route path="/account/*" element={<PrivateRoute component={Account} roles={['USER', 'ADMIN']} authPath="/login" redirectPath="/" />} />    
          <Route path="/admin" element={<PrivateRoute component={Admin} roles={['ADMIN']} authPath="/" redirectPath="/" />} />
          <Route path="*" element={<WrongRoute/>} />
        </Routes>
        <Support />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;