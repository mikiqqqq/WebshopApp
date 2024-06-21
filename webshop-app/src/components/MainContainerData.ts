export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    quantity: number;
    brandId: number;
    typeId: number;
    productionYear: number;
    image: Blob | null; 
}

export interface AddProduct {
    productId: number;
    amount: number;
}

export interface User {
    name: string;
    email: string;
    password: string;
}

export interface UserForm {
    email: string;
    password: string;
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

export interface ProductType {
    id: number;
    name: string;
}

export interface FilterOptions {
    brandIds: number[];
    uprLmt: number;
    lwrLmt: number;
    productTypeId: number;
    productionYear: number;
    sortBy: string;
    sortOrder: string;
}

export interface BrandType {
    id: number;
    name: string;
}

export interface Countries {
    code: string;
    code3: string;
    name: string;
    number: string;
}

export interface JwtPayload {
    name: string;
    email: string;
    role: string;
    [key: string]: any;
}

export interface ErrorResponse {
    message: string;
}
