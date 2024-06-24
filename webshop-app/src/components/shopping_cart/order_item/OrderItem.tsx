import React, { useState } from "react";
import { OrderItemType } from "../../MainContainerData";
import style from "./OrderItem.module.css";
import itemImg from '../../../images/item.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { Alert, Button } from "react-bootstrap";
import OrderItemService from "../../../services/OrderItemService";
import QuantitySelector from "../../quantity_selector/QuantitySelector";

interface Props {
  orderItem: OrderItemType;
  onPriceChange: (id: number, totalPrice: number) => void;
  onRemove: (id: number) => void;
}

const OrderItem: React.FunctionComponent<Props> = ({ orderItem, onPriceChange, onRemove }) => {
  const [showAlert, setShowAlert] = useState(false);
  const product = orderItem.item;

  const removeOrderItem = async (id: number) => {
    setShowAlert(false);
    try {
      await OrderItemService.deleteOrderItem(id);
      onRemove(id);
    } catch (error) {
      console.error("Error removing order item:", error);
    }
  };

  return (
    <div className={style.cart_item} key={orderItem.id}>
      <img src={itemImg} alt={product.title} />
      <div className={style.cart_item_body}>
        <h5>{product.title}</h5>
        <h3>{product.brand.title}</h3>
        <QuantitySelector orderItem={orderItem} product={product} onPriceChange={onPriceChange} />
        
        <Alert show={showAlert} id={style.alert} variant="danger">
          <Alert.Heading>{product.title}</Alert.Heading>
          <p>Are you sure you want to remove this item?</p>
          <hr />
          <div className="d-flex justify-content-end">
            <Button onClick={() => removeOrderItem(orderItem.id)} variant="outline-danger">Yes</Button>
            <Button id={style.cancel_button} onClick={() => setShowAlert(false)} variant="outline-danger">Cancel</Button>
          </div>
        </Alert>

        <button className={style.remove_button} onClick={() => setShowAlert(true)}>
          <FontAwesomeIcon icon={faClose} className={style.icon} /> Remove
        </button>

        <strong id={style.item_price}>${(orderItem.quantity * product.price).toFixed(2)}</strong>
      </div>
    </div>
  );
};

export default OrderItem;