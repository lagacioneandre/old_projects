import { Product } from "../interfaces/product.interface";

export class Table implements Product {
    public operation(): string {
        return 'Rresult of Table';
    }
}