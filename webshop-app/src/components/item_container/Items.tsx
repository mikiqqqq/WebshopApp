import { AddProduct, Product } from '../MainContainerData';
import Item from './item/Item';
import style from './Items.module.css';

interface Props {
    data: Product[];
    addItemToCart: (item: AddProduct) => void;
}

const Items:React.FunctionComponent<Props> = props => {

    return (

        <div className={style.items_container}>
            {
                props.data.map(item => {
                    return <Item key={item.id} item={item} addItemToCart={props.addItemToCart} />;
                })
            }
        </div>
    );
}

export default Items;