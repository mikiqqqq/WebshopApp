import React, { useState, useRef, useCallback, useEffect } from "react";
import { OrderItemType } from "../../MainContainerData";
import style from "./OrderItem.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { Alert, Button } from "react-bootstrap";
import OrderItemService from "../../../services/OrderItemService";
import QuantitySelector from "../../quantity_selector/QuantitySelector";
import { Link } from "react-router-dom";
import image_placeholder from '../../../images/image_placeholder.gif'

interface Props {
  orderItem: OrderItemType;
  onPriceChange: (id: number, totalPrice: number) => void;
  onRemove: (id: number) => void;
}

const OrderItem: React.FunctionComponent<Props> = ({ orderItem, onPriceChange, onRemove }) => {
  const [showAlert, setShowAlert] = useState(false);
  const alertRef = useRef<HTMLDivElement>(null);
  const productSlug = orderItem.item.title.toLowerCase().replace(/\s+/g, '-') + '-' + orderItem.item.id;
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

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (alertRef.current && !alertRef.current.contains(event.target as Node)) {
      setShowAlert(false);
    }
  }, []);

  const handleFocusOutside = useCallback((event: FocusEvent) => {
    if (alertRef.current && !alertRef.current.contains(event.target as Node)) {
      setShowAlert(false);
    }
  }, []);

  useEffect(() => {
    if (showAlert) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("focusin", handleFocusOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("focusin", handleFocusOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("focusin", handleFocusOutside);
    };
  }, [showAlert, handleClickOutside]);

  return (
    <Link to={`/products/${productSlug}`} className={`${style.cart_item} cart-item`} key={orderItem.id}>
      <img src={product.image || image_placeholder} alt={product.title} />
      <div className={style.cart_item_body}>
        <div className={style.cart_item_header}>
          <div className={`${style.cart_item_title} u-h3`}>{product.title}</div>
          <Button className={`${style.remove_button} button_complementary rte u-pb1`} onClick={(e) => {e.preventDefault(); setShowAlert(true);}}>
            <FontAwesomeIcon icon={faClose} className={style.icon} />
          </Button>

           <Alert ref={alertRef} tabIndex={-1}  show={showAlert} id={style.alert} variant="danger" onClick={(e) => e.preventDefault()}>
              <Alert.Heading className={`u-h3`}>{product.title}</Alert.Heading>
              <p>Are you sure you want to remove this item?</p>
              <hr />
              <div className="d-flex justify-content-end">
                <Button className={`u-pb1`} onClick={() => removeOrderItem(orderItem.id)} variant="outline-danger">Yes</Button>
                <Button className={`u-pb1`} id={style.cancel_button} onClick={() => setShowAlert(false)} variant="outline-danger">Cancel</Button>
              </div>
          </Alert>
        </div>

        <div>
          <div className={style.flex_info}>
            <div className={`u-p2`}>{product.brand.title}</div>
          </div>

          <div className={`${style.actions} custom-display`}>
            <QuantitySelector orderItem={orderItem} product={product} onPriceChange={onPriceChange} />

            <strong className={`u-p1`} id={style.item_price}>${(orderItem.quantity * product.price).toFixed(2)}</strong>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default OrderItem;