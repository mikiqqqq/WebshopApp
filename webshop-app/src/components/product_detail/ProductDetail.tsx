import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import style from "./ProductDetail.module.css";
import ItemService from "../../services/ItemService";
import { Product } from "../MainContainerData";
import image_placeholder from '../../images/image_placeholder.gif'
import Item from "../item_container/item/Item";
import OrderItemService from "../../services/OrderItemService";
import OrderService from "../../services/OrderService";
import useLocalStorage from "../../useLocalStorage";
import ItemQuantitySelector from "../item_container/item/quantity_selector/ItemQuantitySelector";


const ProductDetail: React.FC= () => {
    const location = useLocation();
    const [product, setProduct] = useState<Product | null>(null);
    const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
    const [quantity, setQuantity] = useState<number>(1);
    const [, setLocalStateActiveOrder] = useLocalStorage('activeOrder');
    const activeOrder = Number(localStorage.getItem('activeOrder'));

    const addToCart = async (quantity: number, orderId: number, product: Product) => {
        if (!activeOrder) {
          const response = await OrderService.createOrder();
          const activeOrderId = Number(response.data);
          setLocalStateActiveOrder(activeOrderId);
          await OrderItemService.addOrderItem(quantity, activeOrderId, product.id);
        } else {
          await OrderItemService.addOrderItem(quantity, orderId, product.id);
        }
      };

    useEffect(() => {
        const pathSegments = location.pathname.split('/');
        const productSlug = pathSegments[pathSegments.length - 1];
        if (productSlug) {
            const productId = productSlug.split('-').pop();
            if (productId) {
                ItemService.fetchById(Number(productId)).then((response) => {
                    setProduct(response.data);
                });
                ItemService.fetchRandomProducts(8).then((response) => {
                    setRelatedProducts(response.data);
                });
            }
        }
    }, [location.pathname]);

    if (!product) {
        return <div>Loading...</div>;
    }

    const productImageURL = product.image ? URL.createObjectURL(product.image) : image_placeholder;

    return (
        <div className={style.product_detail}>
            <div className={style.product_info}>
                <img src={productImageURL} alt={product.title} />
                <h1>{product.title}</h1>
                <p>{product.description}</p>
                <p>Price: ${product.price}</p>
                <ItemQuantitySelector
          maxQuantity={product.quantity}
          onQuantityChange={setQuantity}
        />
                <button onClick={() => addToCart(
                    quantity,
                    activeOrder,
                    product
                )}>Add to Cart</button>
            </div>
            <div className={style.related_products}>
                <h2>Related Products</h2>
                <Swiper spaceBetween={10} slidesPerView={4}>
                    {relatedProducts.map((relatedProduct) => (
                        <SwiperSlide key={relatedProduct.id}>
                            <Item key={relatedProduct.id} item={relatedProduct} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default ProductDetail;