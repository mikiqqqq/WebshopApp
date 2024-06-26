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
import useLocalStorage from "../../hooks/useLocalStorage";
import ItemQuantitySelector from "../item_container/item/quantity_selector/ItemQuantitySelector";
import { Button } from "react-bootstrap";
import useElementaryAnimation from "../../hooks/useElementaryAnimation";


const ProductDetail: React.FC= () => {
    const location = useLocation();
    const [product, setProduct] = useState<Product | null>(null);
    const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
    const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);
    const [quantity, setQuantity] = useState<number>(1);
    const [, setLocalStateActiveOrder] = useLocalStorage('activeOrder');
    const activeOrder = Number(localStorage.getItem('activeOrder'));
    useElementaryAnimation();

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
                ItemService.fetchRandomProducts(8).then((response) => {
                    setRecommendedProducts(response.data);
                });
            }
        }
    }, [location.pathname]);

    if (!product) {
        return <div>Loading...</div>;
    }

    const productImageURL = product.image ? product.image : image_placeholder;

    return (
        <div className={style.module}>
            <div className={`${style.container} animated_content`} data-animation="elementScaleOut">
                <img className={style.image} src={productImageURL} alt={product.title} />
                <div className={style.product_info}>
                    <div>
                    <div className={style.header}>
                        <p className={`${style.product_heading} u-h1`}>{product.title}</p>
                        <p className={`u-p1`}>{product.description}</p>
                    </div>
                    <div className={style.detail}>
                        <p className={`u-p2`}>
                            <span className={`u-pb1`}>Type: </span>
                            {product.productType.title}
                        </p>
                        <p className={`u-p2`}>
                            <span className={`u-pb1`}>Brand: </span>
                            {product.brand.title}
                        </p>
                        <p className={`u-p2`}>
                            <span className={`u-pb1`}>Year: </span>
                            {product.productionYear}
                        </p>
                    </div>
                    </div>
                    <div className={`${style.actions} custom-display`}>
                        <p className={`${style.price} u-pb1`}>${product.price}</p>
                        <ItemQuantitySelector
                            maxQuantity={product.quantity}
                            onQuantityChange={setQuantity}
                        />
                        <Button onClick={() => addToCart(quantity, activeOrder,product)} 
                            className={`${style.add_to_cart} button_complementary u-pb1`}
                        >
                            Add to Cart
                        </Button>
                    </div>
                </div>
            </div>
            <div className={style.related_products}>
                <div className={`${style.heading} animated_content`} data-animation="elementFromLeft">
                    <div className={`${style.heading_text} u-h1`}>Related products</div>
                </div>
                <Swiper 
                className="animated_content"
                data-animation="elementFromBottom"
                spaceBetween={16} 
                slidesPerView={1}
                breakpoints={{
                    600: { slidesPerView: 2 },
                    1025: { slidesPerView: 3 },
                    1440: { slidesPerView: 4 }
                }}>
                    {relatedProducts.map((relatedProduct) => (
                        <SwiperSlide key={relatedProduct.id}>
                            <Item key={relatedProduct.id} item={relatedProduct} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className={style.recommended_products} data-animation="elementFromBottom">
                <div className={`${style.heading} animated_content`} data-animation="elementFromLeft">
                    <div className={`${style.heading_text} u-h1`}>You may like</div>
                </div>
                <Swiper 
                className="animated_content"
                data-animation="elementFromBottom"
                spaceBetween={16} 
                slidesPerView={1}
                breakpoints={{
                    600: { slidesPerView: 2 },
                    1025: { slidesPerView: 3 },
                    1440: { slidesPerView: 4 }
                }}>
                    {recommendedProducts.map((recommendedProduct) => (
                        <SwiperSlide key={recommendedProduct.id}>
                            <Item key={recommendedProduct.id} item={recommendedProduct} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default ProductDetail;