import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import style from './Item.module.css';
import itemImg from '../../../images/item.jpg';
import { AddProduct, Product } from "../../MainContainerData";
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BrandService from "../../../services/BrandService";
import { Col, Overlay, Tooltip } from "react-bootstrap";

interface Props {
  addItemToCart: (item: AddProduct) => void;
  item: Product;
}

const Item: React.FC<Props> = ({ addItemToCart, item }) => {
  const navigate = useNavigate();
  const [brandName, setBrandName] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [disableButton, setDisableButton] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [show, setShow] = useState(false);
  const target = useRef(null);

  useEffect(() => {
    if (show) {
      const timeoutId = setTimeout(() => {
        setShow(false);
      }, 750);
      return () => clearTimeout(timeoutId);
    }
  }, [show]);

  const addToCart = () => {
    addItemToCart({
      productId: item.id,
      amount: quantity,
    });
    setQuantity(1);
  };

  useEffect(() => {
    BrandService.findById(item.brandId).then((response) => {
      setBrandName(response.data.name);
    });
  }, [item.brandId]);

  const increment = () => {
    console.log(quantity, item.quantity)
    if (quantity + 1 <= item.quantity) {
      setQuantity(quantity + 1);
      setDisableButton(quantity + 1 === item.quantity);
      setMessage(quantity + 1 === item.quantity ? ' - Max' : '');
    }
  };

  const decrement = () => {
    if (quantity - 1 > 0) {
      setQuantity(quantity - 1);
      setMessage('');
      setDisableButton(false);
    }
  };

  const handleProductClick = () => {
    const productSlug = item.title.toLowerCase().replace(/\s+/g, '-') + '-' + item.id;
    navigate(`/products/${productSlug}`);
  };

  return (
      <div className={style.item_box} onClick={handleProductClick}>
        <img className={style.image} src={itemImg} alt={item.title}></img>
        <h3 className={style.item_name}>{item.title}</h3>
        <p className={style.item_description}>{item.description}</p>
        <p className={style.item_brand}>{brandName}</p>
        <div className={style.hover_buttons}>
          <div className={style.quantity_counter}>
            <button className={`${style.quantity_button} ${style.quantity_button_decrement}`} 
                onClick={(e) => {
                    e.stopPropagation();
                    decrement();
                }}>
              <p>-</p>
            </button>
            <p className={style.quantity_display}>{quantity}{message}</p>
            <button className={`${style.quantity_button} ${style.quantity_button_increment}`} 
                            onClick={(e) => {
                                e.stopPropagation();
                                increment();
                            }}>
              <p>+</p>
            </button>
          </div>
          <button
            className={style.cart_button}
            onClick={(e) => { e.stopPropagation(); setShow(true); addToCart(); }}
            ref={target}
            disabled={disableButton}
          >
            <FontAwesomeIcon className={style.icon} icon={faCartPlus} />
          </button>
          <Overlay target={target.current} show={show} placement="top">
            <Tooltip id="overlay-example" className={style.tooltip}>
              Added
            </Tooltip>
          </Overlay>
        </div>
        <strong className={style.item_price}>${item.price.toFixed(2)}</strong>
      </div>
  );
};

export default Item;