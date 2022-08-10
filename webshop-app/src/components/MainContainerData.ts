export interface Hit {
    id: number;
    name: string;
    description: string;
    price: number;
    amount: number;
    brandId: number;
    quantity: number;
}

export interface AddItem {
    itemId: number;
    amount: number;
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