import { ResponseItems } from "./ResponseItemsData";

export interface DataReducer {
    data: ResponseItems | undefined;
    isLoading: boolean;
    isError: boolean;
}

export interface Actions {
    type: string;
    payload: any;
}

export interface SearchOptions {
    search: string;
    page: number;
}

export interface PriceFilterOptions {
    upperLimit: number;
    lowerLimit: number;
}