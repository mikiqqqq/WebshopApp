import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Checkout from './components/checkout/Checkout';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import MainContainer from './components/MainContainer';
import { Hit, AddItem } from './components/MainContainerData';
import ShoppingCart from './components/shopping_cart/ShoppingCart';
import Support from './components/support/Support';
import DiscountCodeService from './services/DiscountCodeService';
import ItemService from './services/ItemService';
import OrderItemService from './services/OrderItemService';
import OrderService from './services/OrderService';


interface OrderItemAndAmount {
  id: number;
  quantity: number;
}

let activeOrderId: number;
function App() {
  const [discountCode, setDiscountCode] = useState<string>('');
  const [activeOrder, setActiveOrder] = useState<number>(0);
  const [color, changeColor] = useState<string>('');
  const [orderItems, setOrderItems] = useState<Array<Hit>>([]);
  const [updateOrderItems, setUpdateOrderItems] = useState<boolean>(false);
  let orderItemsArray = new Array<Hit>();
  let orderItemAndAmount = new Array<OrderItemAndAmount>();

  useEffect(() => {
    fetchActiveDiscountCode();
    if(activeOrder) getOrderItems();
  }, [updateOrderItems]);

  const fetchActiveDiscountCode = () => {
    DiscountCodeService.fetchActiveDiscountCode().then((response) => {
      setDiscountCode(response.data.code);
    });
  }

  const getOrderItems = async () => {
    orderItemAndAmount = (await OrderItemService.getOrderItemAmount(activeOrder)).data;
    orderItemsArray = (await ItemService.findItemByItemId(orderItemAndAmount.map(item => item.id))).data;

    setOrderItems(orderItemsArray.map(item =>
      ({ ...item, ...orderItemAndAmount.find(orderItem => orderItem.id === item.id) }))
    );
  }

  const addItemToTheCart = async (item: AddItem) => {
    if (item.firstAdded) {
      activeOrderId = (await OrderService.createOrder(new Date().toLocaleDateString('hr-HR'))).data
      setActiveOrder(activeOrderId);
      changeColor('red');
      await OrderItemService.createOrderItem(activeOrderId, item.itemId);
    }else{
      await OrderItemService.createOrderItem(activeOrder, item.itemId);
    }
    setUpdateOrderItems(!updateOrderItems);
  }

  const addOrRemoveOrderItem = async (itemId: number, decider: number) => {
    if(decider) await OrderItemService.createOrderItem(activeOrder, itemId);
    else await OrderItemService.deleteOrderItem(activeOrder, itemId);
    setUpdateOrderItems(!updateOrderItems);
  }

  const removeOrderItemAll = async (itemId: number) => {
    await OrderItemService.deleteOrderItemsAll(itemId, activeOrder);
    setUpdateOrderItems(!updateOrderItems);
  }

  return (
    <BrowserRouter>
      <div className="page">
        <Header discount={discountCode} red={color} activeOrder={activeOrder} orderItems={orderItems} />
        <Routes>
          <Route path="/tech" element={<MainContainer addItemToCart={addItemToTheCart} />} />
          <Route path="/shopping_cart" element={<ShoppingCart activeOrder={activeOrder} orderItems={orderItems} 
          removeOrderItemAll={removeOrderItemAll} addOrRemoveOrderItem={addOrRemoveOrderItem}/>} />
          <Route path="/checkout" element={<Checkout activeOrder={activeOrder} orderItems={orderItems} 
          removeOrderItemAll={removeOrderItemAll} addOrRemoveOrderItem={addOrRemoveOrderItem}/>} />
          <Route path="*" element={<></>} />
        </Routes>
        <Support />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
