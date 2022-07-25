import style from './FixedSidebar.module.css'
import Accordion from 'react-bootstrap/Accordion';
import Brand from './brand/Brand';
import { PriceFilterOptions } from '../MainContainerData';
import Form from 'react-bootstrap/Form';

interface Props {
    onBrandFilterOptions: (brandFilterOptions: number) => void;
    onPriceFilterOptions: (priceFiletOptions: PriceFilterOptions) => void;
    reset: (reset: number) => void;
}

const FixedSidebar:React.FunctionComponent<Props> = props => {
    const handleRadioClick = (uprLmt: number, lwrLmt: number) => {
            props.onPriceFilterOptions({
                upperLimit: uprLmt,
                lowerLimit: lwrLmt
            });   
    }

    return (
        <div className={style.sidebar}>
            <div className={style.fixed}>
            <h2 className={style.filter_title}>Filtriraj proizvode: </h2>
            <Accordion className={style.accordion} flush>
                <Accordion.Item className={style.accordion_item} eventKey="0">
                    <Accordion.Header className={style.accordion_header}>Brand</Accordion.Header>
                    <Accordion.Body className={style.accordion_body}>
                        <Brand reset={props.reset} onBrandFilterOptions={props.onBrandFilterOptions}/>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item className={style.accordion_item} eventKey="1">
                    <Accordion.Header className={style.accordion_header}>Cijena</Accordion.Header>
                    <Accordion.Body className={style.accordion_body}>
                            <Form>
                                {['radio'].map((type) => (
                                    <div key={`reverse-${type}`} className="mb-3">
                                        <Form.Check
                                            label="< 1000kn"
                                            name="group1"
                                            type="radio"
                                            onClick={() => handleRadioClick(1000, 0)}
                                            id={`reverse-${type}-1`}
                                        />
                                        <Form.Check
                                            label="1000kn - 5000kn"
                                            name="group1"
                                            type="radio"
                                            onClick={() => handleRadioClick(5000, 1000)}
                                            id={`reverse-${type}-2`}
                                        />
                                        <Form.Check
                                            label="5000kn - 10 000kn"
                                            name="group1"
                                            type="radio"
                                            onClick={() => handleRadioClick(10000, 5000)}
                                            id={`reverse-${type}-3`}
                                        />
                                        <Form.Check
                                            label="10 000kn >"
                                            name="group1"
                                            type="radio"
                                            onClick={() => handleRadioClick(15000, 25000)}
                                            id={`reverse-${type}-3`}
                                        />
                                    </div>
                                ))}
                            </Form>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            </div>
        </div>
    );
}

export default FixedSidebar;