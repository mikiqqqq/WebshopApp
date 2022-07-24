import style from './ItemSection.module.css'
import Item from './item/Item';

export default function ItemSection() {
    return (
       <section className={style.section}>
            <Item/>
       </section>
    );
}