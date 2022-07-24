import FixedSidebar from '../fixed_sidebar/FixedSidebar';
import ItemSection from '../item_container/ItemSection';
import style from './Main.module.css'

export default function Main() {
    return (
        <main className={style.main}>
            <FixedSidebar/>
            <ItemSection/>
        </main>
    );
}