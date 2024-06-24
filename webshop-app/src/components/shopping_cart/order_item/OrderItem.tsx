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

interface Props {
    orderItem: OrderItemType;
    onPriceChange: (id: number, totalPrice: number) => void;
}



const OrderItem: React.FunctionComponent<Props> = props => {
    const [brand, setBrand] = useState<string>('');
    const [quantity, setQuantity] = useState<number>(props.orderItem.quantity);
    const [message, setMessage] = useState<string>('');
    const [showAlert, setShowAlert] = useState(false);
    const [product, setProduct] = useState<Product>();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await ItemService.fetchById(props.orderItem.productId);
                setProduct(response.data);
                if (response.data) {
                    props.onPriceChange(props.orderItem.id, response.data.price * props.orderItem.quantity);
                }
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };

        fetchProduct();
    }, [props]);

    useEffect(() => {
        const fetchBrand = async () => {
            if (product) {
                try {
                    const response = await BrandService.findById(product.brandId);
                    setBrand(response.data);
                } catch (error) {
                    console.error("Error fetching brand:", error);
                }
            }
        };

        fetchBrand();
    }, [product]);

    const removeOrderItem = (id: number) => {
        setShowAlert(false);
        OrderItemService.deleteOrderItem(id);
    }

    const increment = () => {
        if (!product || quantity + 1 > product.quantity) return;
        
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
        props.orderItem.quantity = newQuantity;
        OrderItemService.updateOrderItem(props.orderItem);
        props.onPriceChange(props.orderItem.id, product.price * newQuantity);
        
        if (newQuantity >= product.quantity) {
            setMessage(' - Maxed out');
        } else {
            setMessage('');
        }
    };

    const decrement = () => {
        if (!product) return;
        
        if (quantity - 1 > 0) {
            const newQuantity = quantity - 1;
            setQuantity(newQuantity);
            props.orderItem.quantity = newQuantity;
            OrderItemService.updateOrderItem(props.orderItem);
            props.onPriceChange(props.orderItem.id, product.price * newQuantity);
            setMessage('');
        }
    }
    
    if (!product) return null;

    return (
        <div className={style.cart_item} key={props.orderItem.id}>
            <img src={itemImg} alt={product.title} />
            <div className={style.cart_item_body}>
                <h5>{product.title}</h5>
                <h3>{brand}</h3>
                <div className={style.quantity_counter}>
                    <button className={`${style.quantity_button} ${style.quantity_button_decrement}`}
                        onClick={decrement}>
                        <p>-</p>
                    </button>
                    <p className={style.quantity_display}>{quantity}{message}</p>
                    <button className={`${style.quantity_button} ${style.quantity_button_increment}`} onClick={increment}>
                        <p>+</p>
                    </button>
                </div>

                <Alert show={showAlert} id={style.alert} variant="danger">
                    <Alert.Heading>{product.title}</Alert.Heading>
                    <p>
                        Are you sure you want to remove this item?
                    </p>
                    <hr />
                    <div className="d-flex justify-content-end">
                        <Button onClick={() => removeOrderItem(props.orderItem.id)} variant="outline-danger">
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
            
                <strong id={style.item_price}>${(quantity * product.price).toFixed(2)}</strong>
            </div>
        </div>
    );
}

export default OrderItem;