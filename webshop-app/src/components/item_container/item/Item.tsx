import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import style from './Item.module.css';
import { Product } from "../../MainContainerData";
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Overlay, Tooltip } from "react-bootstrap";
import OrderService from "../../../services/OrderService";
import ItemQuantitySelector from "./quantity_selector/ItemQuantitySelector";
import OrderItemService from "../../../services/OrderItemService";
import useLocalStorage from "../../../hooks/useLocalStorage";
import image_placeholder from '../../../images/image_placeholder.gif'
import useElementaryAnimation from "../../../hooks/useElementaryAnimation";

interface Props {
  item: Product;
}


const Item: React.FC<Props> = ({ item }) => {
  const [, setLocalStateActiveOrder] = useLocalStorage('activeOrder');
  const [quantity, setQuantity] = useState<number>(1);
  const [show, setShow] = useState(false);
  const target = useRef(null);
  const activeOrder = Number(localStorage.getItem('activeOrder'));
  const productSlug = item.title.toLowerCase().replace(/\s+/g, '-') + '-' + item.id;
  useElementaryAnimation();

  const addToCart = async (quantity: number, orderId: number, product: Product) => {
      if (!activeOrder) {
        const response = await OrderService.createOrder();
        const activeOrderId = Number(response.data);
        setLocalStateActiveOrder(activeOrderId);
        await OrderItemService.addOrderItem(quantity, activeOrderId, item.id);
      } else {
        await OrderItemService.addOrderItem(quantity, orderId, item.id);
      }
    };

  useEffect(() => {
    if (show) {
      const timeoutId = setTimeout(() => {
        setShow(false);
      }, 750);
      return () => clearTimeout(timeoutId);
    }
  }, [show]);


  const truncateDescription = (description: string, maxLength = 50) => {
    if (description.length > maxLength) {
        return description.substring(0, maxLength) + '...';
    }
    return description;
};

  return (
      <Link to={`/products/${productSlug}`} className={`${style.item_box} animated_content`}>
        <img className={style.image} src={item.image || image_placeholder} alt={item.title}></img>
        <div className={style.item_info}>
          <div className={style.item_header}>
            <div className={`${style.item_name} u-h3`}>{item.title}</div>
            <p className={`${style.item_description} u-p2`}>{truncateDescription(item.description)}</p>
          </div>

          <div className={style.actions}>
            <p className={`${style.item_brand} u-p2`}>{item.brand.title}</p>
            <div className={style.hover_buttons}>
              <ItemQuantitySelector
                maxQuantity={item.quantity}
                onQuantityChange={setQuantity}
              />
              <button
                className={style.cart_button}
                onClick={(e) => { e.preventDefault(); setShow(true); addToCart(
                  quantity,
                  activeOrder,
                  item
              ) }}
                ref={target}
              >
                <FontAwesomeIcon className={style.icon} icon={faCartPlus} />
              </button>
              <Overlay target={target.current} show={show} placement="top">
                <Tooltip id="overlay-example" className={style.tooltip}>
                  Added
                </Tooltip>
              </Overlay>
            </div>
            <strong className={`${style.item_price} u-pb1`}>${item.price.toFixed(2)}</strong>
          </div>
        </div>
      </Link>
  );
};

export default Item;