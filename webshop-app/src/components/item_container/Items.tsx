import Item from './item/Item';
import style from './Items.module.css';

interface ItemType {
    id: number;
    name: string;
    description: string;
    price: number;
  }

interface Props {
    data: ItemType[];
}

const Items:React.FunctionComponent<Props> = props => {
    return (
        <div className={style.items_container}>
            {
                props.data.map(item => {
                    return <Item key={item.id} item={item} />
                })
            }
        </div>
    );
}

export default Items;