import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import style from "./ProductDetail.module.css";
import ItemService from "../../services/ItemService";
import { AddProduct, Product } from "../MainContainerData";
import image_placeholder from '../../images/image_placeholder.gif'
import Item from "../item_container/item/Item";

interface Props {
    addItemToCart: (item: AddProduct) => void;
}

const ProductDetail: React.FC<Props> = ({ addItemToCart }) => {
    const location = useLocation();
    const [product, setProduct] = useState<Product | null>(null);
    const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

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
                <div className={style.quantity}>
                    <label>Quantity:</label>
                    <input type="number" min="1" defaultValue="1" />
                </div>
                <button onClick={() => addItemToCart({
                    productId: product.id,
                    amount: 1,
                })}>Add to Cart</button>
            </div>
            <div className={style.related_products}>
                <h2>Related Products</h2>
                <Swiper spaceBetween={10} slidesPerView={4}>
                    {relatedProducts.map((relatedProduct) => (
                        <SwiperSlide key={relatedProduct.id}>
                            <Item key={relatedProduct.id} item={relatedProduct} addItemToCart={addItemToCart} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default ProductDetail;