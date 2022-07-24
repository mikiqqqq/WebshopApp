import style from './FixedSidebar.module.css'
import Accordion from 'react-bootstrap/Accordion';

export default function FixedSidebar() {
    return (
        <div className={style.sidebar}>
            <div className={style.fixed}>
            <h2 className={style.filter_title}>Filtriraj proizvode: </h2>
            <Accordion className={style.accordion} flush>
                <Accordion.Item className={style.accordion_item} eventKey="0">
                    <Accordion.Header className={style.accordion_header}>Brand</Accordion.Header>
                    <Accordion.Body className={style.accordion_body}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                        aliquip ex ea commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                        culpa qui officia deserunt mollit anim id est laborum.
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item className={style.accordion_item} eventKey="1">
                    <Accordion.Header className={style.accordion_header}>Cijena</Accordion.Header>
                    <Accordion.Body className={style.accordion_body}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                        aliquip ex ea commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                        culpa qui officia deserunt mollit anim id est laborum.
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            </div>
        </div>
    );
}