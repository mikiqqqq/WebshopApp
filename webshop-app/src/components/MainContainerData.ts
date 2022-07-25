export interface Hit {
    id: number;
    name: string;
    description: string;
    price: number;
    brandId: number;
}

export interface AddItem {
    itemId: number;
    firstAdded: boolean;
}

export interface OrderCreate{
    id: number;
    date: Date;
}

export interface SearchOptions {
    search: string;
    page: number;
}

export interface PriceFilterOptions {
    upperLimit: number;
    lowerLimit: number;
}