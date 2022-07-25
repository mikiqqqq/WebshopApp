export interface ResponseItems {
    items: Hit[];
}

export interface Hit {
    id: number;
    name: string;
    description: string;
    price: number;
}