import { Locator } from "playwright";

export interface ICartItem {
    name: string ;
    model: string;
    unitPrice: number;
    quantity: number;
    total: number;
    removeLocator: Locator
}