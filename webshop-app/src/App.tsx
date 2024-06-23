import { useState, useEffect, useCallback } from 'react';
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
import ProductDetail from './components/product_detail/ProductDetail';

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

  const fetchActiveDiscountCode = useCallback(() => {
    DiscountCodeService.fetchActiveDiscountCode()
      .then((response) => {
        setDiscountCode(response.data.code);
        setError(false);
      })
      .catch(() => {
        setError(true);
      });
  }, []);

  const getOrderItems = useCallback(async () => {
    try {
      const orderItemAndAmount: OrderItemAndAmount[] = (await OrderItemService.getOrderItemAmount(localStateActiveOrder)).data;
      if (orderItemAndAmount.length === 0) {
        await OrderService.deleteOrder(localStateActiveOrder);
        setOrderItems([]);
        setLocalStateActiveOrder(0);
        setFirstAdded(true);
        return;
      }
      const orderItemsArray: Product[] = (await ItemService.findItemByItemId(orderItemAndAmount.map(item => item.id))).data;
      setOrderItems(orderItemsArray.map(item => ({
        ...item,
        ...orderItemAndAmount.find(orderItem => orderItem.id === item.id),
      })));
    } catch (err) {
      console.log(err);
    }
  }, [localStateActiveOrder, setLocalStateActiveOrder]);

  useEffect(() => {
    fetchActiveDiscountCode();
    if (localStateActiveOrder) {
      setFirstAdded(false);
      getOrderItems();
    }
  }, [fetchActiveDiscountCode, getOrderItems, localStateActiveOrder, updateOrderItems]);

  useEffect(() => {
    if (orderCompleted) {
      setOrderItems([]);
      setLocalStateActiveOrder(0);
      setFirstAdded(true);
    }
  }, [orderCompleted, setLocalStateActiveOrder]);

  const addItemToTheCart = useCallback(async (item: AddProduct) => {
    if (firstAdded) {
      const response = await OrderService.createOrder();
      const activeOrderId = response.data.id;
      setLocalStateActiveOrder(Number(activeOrderId));
      if (item.amount > 1) await OrderItemService.createMultipleOrderItems(activeOrderId, item.productId, item.amount);
      else await OrderItemService.createOrderItem(activeOrderId, item.productId);
      setFirstAdded(false);
    } else {
      if (item.amount > 1) await OrderItemService.createMultipleOrderItems(localStateActiveOrder, item.productId, item.amount);
      else await OrderItemService.createOrderItem(localStateActiveOrder, item.productId);
    }
    setUpdateOrderItems(prev => !prev);
  }, [firstAdded, localStateActiveOrder, setLocalStateActiveOrder]);

  const addOrRemoveOrderItem = useCallback(async (itemId: number, decider: number) => {
    if (decider) await OrderItemService.createOrderItem(localStateActiveOrder, itemId);
    else await OrderItemService.deleteOrderItem(localStateActiveOrder, itemId);
    setUpdateOrderItems(prev => !prev);
  }, [localStateActiveOrder]);

  const emptyShoppingCart = useCallback(async (empty: boolean) => {
    if (empty) {
      await OrderItemService.deleteAllOrderItemsByOrderId(localStateActiveOrder);
      setUpdateOrderItems(prev => !prev);
    }
  }, [localStateActiveOrder]);

  const removeOrderItemAll = useCallback(async (itemId: number) => {
    await OrderItemService.deleteOrderItemAll(itemId, localStateActiveOrder);
    setUpdateOrderItems(prev => !prev);
  }, [localStateActiveOrder]);

  return (
    <BrowserRouter>
      <div className="page">
        <Header discount={discountCode} activeOrder={localStateActiveOrder} orderItems={orderItems} error={error} />
        <Routes>
          <Route path="/" element={<MainContainer addItemToCart={addItemToTheCart} />} />
          <Route path="/products/*" element={<ProductDetail addItemToCart={addItemToTheCart} />} />
          <Route path="/shopping_cart" element={<ShoppingCart
            activeOrder={localStateActiveOrder}
            orderItems={orderItems}
            removeOrderItemAll={removeOrderItemAll}
            addOrRemoveOrderItem={addOrRemoveOrderItem}
            emptyShoppingCart={emptyShoppingCart}
          />} />
          <Route path="/checkout" element={<Checkout
            activeOrder={localStateActiveOrder}
            orderItems={orderItems}
            removeOrderItemAll={removeOrderItemAll}
            addOrRemoveOrderItem={addOrRemoveOrderItem}
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