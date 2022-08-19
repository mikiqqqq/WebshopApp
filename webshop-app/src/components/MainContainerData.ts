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
}

export interface DiscountCode{
    id: number;
    code: string;
    discountAmount: number;
    active: boolean;
}

export interface OrderCreate{
    id: number;
    date: Date;
}

export interface OrderUpdate{
    id: number,
    date: string,
    priceWithNoPdvIncluded: number;
    total: number;
    discountCodeId?: number;
    paymentMethod: number;
    creditCardNumber?: string;
    email: string;
    phoneNumber: number;
    deliveryAddress: string;
    note: string;
}

export interface SearchOptions {
    search: string;
    page: number;
}

export interface PriceFilterOptions {
    upperLimit: number;
    lowerLimit: number;
}