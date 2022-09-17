import { Locator } from "playwright";

export interface IShopItem {
    title: string ;
    price: number;
    isAvailable: boolean;
    basketLocator: Locator
}