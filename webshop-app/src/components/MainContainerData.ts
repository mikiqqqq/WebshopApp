export interface BrandType {
    id: number;
    title: string;
}

export interface ProductType {
    id: number;
    title: string;
}

export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    quantity: number;
    brand: BrandType; // Included Brand object
    productType: ProductType; // Included ProductType object
    productionYear: number;
    image: string; 
}

export interface OrderItemType {
    id: number;
    quantity: number;
    orderId: number;
    item: Product; // Included Product object
}

export interface AddProduct {
    productId: number;
    amount: number;
}

export interface User {
    name: string;
    email: string;
    role: string;
}

export interface UserRegisterForm {
    name: string;
    email: string;
    password: string;
}

export interface UserLoginForm {
    email: string;
    password: string;
}

export interface DiscountCode {
    id: number;
    code: string;
    discountAmount: number;
    active: boolean;
}

export interface OrderCreate {
    id: number;
    date: Date;
}

export interface OrderUpdate {
    id: number;
    date: string;
    priceWithNoPdvIncluded: number;
    total: number;
    discountCodeId?: number;
    paymentMethod: number;
    creditCardNumber?: string;
    email: string;
    phoneNumber: number;
    deliveryAddress: string;
    note: string;
    status: string;
}

export interface OrderObject {
    id: number;
    date: string;
    priceWithNoPdvIncluded: number;
    total: number;
    discountCodeId?: number;
    paymentMethod: number;
    creditCardNumber?: string;
    email: string;
    phoneNumber: number;
    deliveryAddress: string;
    note: string;
    products: Product[];
}

export interface SearchOptions {
    search: string;
    page: number;
}

export interface PriceFilterOptions {
    upperLimit: number;
    lowerLimit: number;
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

export type ErrorResponse400 = {
    [key: string]: string;
};

export type ErrorResponse = {
    error: string;
};

export const theme = {
    animationDuration: 500, // Default duration in ms
    animationBetweenElements: 100, // Default delay in ms
    enableAnimations: true // Default state of animations
  };