import React, { useEffect, useState } from "react";
import { OrderItemType, Product } from "../../MainContainerData";
import style from "./OrderItem.module.css";
import itemImg from '../../../images/item.jpg';
import BrandService from "../../../services/BrandService";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { Alert, Button } from "react-bootstrap";
import OrderItemService from "../../../services/OrderItemService";
import ItemService from "../../../services/ItemService";
import QuantitySelector from "../../quantity_selector/QuantitySelector";

interface Props {
  orderItem: OrderItemType;
  onPriceChange: (id: number, totalPrice: number) => void;
  onRemove: (id: number) => void;
}

const OrderItem: React.FunctionComponent<Props> = ({ orderItem, onPriceChange, onRemove }) => {
  const [brand, setBrand] = useState<string>('');
  const [product, setProduct] = useState<Product>();
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await ItemService.fetchById(orderItem.itemId);
        const fetchedProduct = response.data;
        setProduct(fetchedProduct);
        if (fetchedProduct) {
          onPriceChange(orderItem.id, fetchedProduct.price * orderItem.quantity);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [onPriceChange, orderItem.id, orderItem.itemId, orderItem.quantity]);

  useEffect(() => {
    const fetchBrand = async () => {
      if (product) {
        try {
          const response = await BrandService.findById(product.brandId);
          setBrand(response.data.name);
        } catch (error) {
          console.error("Error fetching brand:", error);
        }
      }
    };

    fetchBrand();
  }, [product]);

  const removeOrderItem = async (id: number) => {
    setShowAlert(false);
    try {
      await OrderItemService.deleteOrderItem(id);
      onRemove(id); // Notify parent component
    } catch (error) {
      console.error("Error removing order item:", error);
    }
  };

  if (!product) return null;

  return (
    <div className={style.cart_item} key={orderItem.id}>
      <img src={itemImg} alt={product.title} />
      <div className={style.cart_item_body}>
        <h5>{product.title}</h5>
        <h3>{brand}</h3>
        <QuantitySelector
          orderItem={orderItem} 
          product={product} 
          onPriceChange={onPriceChange} 
        />

        <Alert show={showAlert} id={style.alert} variant="danger">
          <Alert.Heading>{product.title}</Alert.Heading>
          <p>
            Are you sure you want to remove this item?
          </p>
          <hr />
          <div className="d-flex justify-content-end">
            <Button onClick={() => removeOrderItem(orderItem.id)} variant="outline-danger">
              Yes
            </Button>
            <Button id={style.cancel_button} onClick={() => setShowAlert(false)} variant="outline-danger">
              Cancel
            </Button>
          </div>
        </Alert>

        <button className={style.remove_button} onClick={() => setShowAlert(true)}>
          <FontAwesomeIcon icon={faClose} className={style.icon} />&nbsp;&nbsp;&nbsp;Remove
        </button>

        <strong id={style.item_price}>${(orderItem.quantity * product.price).toFixed(2)}</strong>
      </div>
    </div>
  );
};

export default OrderItem;