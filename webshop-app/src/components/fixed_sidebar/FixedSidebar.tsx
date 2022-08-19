import style from './FixedSidebar.module.css'
import Accordion from 'react-bootstrap/Accordion';
import Brand, { FilterOptions } from './filter/brand/Brand';
import Type from './filter/type/Type';
import ProductionYear from './filter/production_year/ProductionYear';
import Price from './filter/price/Price';
import SortPrice from './sort/SortPrice';
import SortName from './sort/SortName';
import { useEffect, useState } from 'react';
import image from '../../images/tech.png'

interface Props {
    onFilterOptions: (filterOptions: FilterOptions) => void;

    filterOptions: FilterOptions;
}

const FixedSidebar:React.FunctionComponent<Props> = props => {
    const [filterOptions, setFilterOptions] = useState<FilterOptions>(props.filterOptions);
    const baseColor = window.getComputedStyle(document.documentElement).getPropertyValue('--base-color');
    const backgroundColor = window.getComputedStyle(document.documentElement).getPropertyValue('--background');

    const handleClick = (sortBy: string) => {
        setFilterOptions(() => {
            return {
                ...props.filterOptions,
                sortBy: sortBy,
                sortOrder: "ASC"
            };
        })
    }

    useEffect(() => {
        props.onFilterOptions(filterOptions); 
    }, [filterOptions])

    return (
        <div className={style.sidebar}>
            <div className={style.fixed}>
                <h2 className={style.filter_title}>Sort products</h2>
                <Accordion className={style.accordion} flush>
                    
                    <Accordion.Item className={style.accordion_item} eventKey="0">
                        <Accordion.Header onClick={() => handleClick("PRICE")} className={style.accordion_header}>Price</Accordion.Header>
                        <Accordion.Body className={style.accordion_body_sort}>
                            <SortPrice onFilterOptions={props.onFilterOptions} filterOptions={filterOptions}
                                    baseColor={baseColor} backgroundColor={backgroundColor}/>
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item className={style.accordion_item} eventKey="1">
                        <Accordion.Header onClick={() => handleClick("NAME")} className={style.accordion_header}>Alphabetically</Accordion.Header>
                        <Accordion.Body className={style.accordion_body_sort}>
                            <SortName onFilterOptions={props.onFilterOptions} filterOptions={filterOptions}
                                    baseColor={baseColor} backgroundColor={backgroundColor}/>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>

                <h2 className={style.filter_title}>Filter products</h2>
                <Accordion className={style.accordion} flush>
                    
                    <Accordion.Item className={style.accordion_item} eventKey="0">
                        <Accordion.Header className={style.accordion_header}>Type</Accordion.Header>
                        <Accordion.Body className={style.accordion_body_radio}>
                            <Type onFilterOptions={props.onFilterOptions} filterOptions={props.filterOptions}
                                    baseColor={baseColor} backgroundColor={backgroundColor}/>
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item className={style.accordion_item} eventKey="1">
                        <Accordion.Header className={style.accordion_header}>Brand</Accordion.Header>
                        <Accordion.Body className={style.accordion_body}>
                            <Brand onFilterOptions={props.onFilterOptions} filterOptions={props.filterOptions}
                                    baseColor={baseColor} backgroundColor={backgroundColor}/>
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item className={style.accordion_item} eventKey="2">
                        <Accordion.Header className={style.accordion_header}>Price</Accordion.Header>
                        <Accordion.Body className={style.accordion_body_radio}>
                            <Price onFilterOptions={props.onFilterOptions} filterOptions={props.filterOptions}
                                    baseColor={baseColor} backgroundColor={backgroundColor}/>
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item className={style.accordion_item} eventKey="4">
                        <Accordion.Header className={style.accordion_header}>Year</Accordion.Header>
                        <Accordion.Body className={style.accordion_body_radio}>
                            <ProductionYear onFilterOptions={props.onFilterOptions} filterOptions={props.filterOptions}
                                    baseColor={baseColor} backgroundColor={backgroundColor}/>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>

                <div className={style.image_container}>
                    <img src={image} className={style.image} alt="Tech"></img>
                </div>
            </div>
        </div>
    );
}

export default FixedSidebar;