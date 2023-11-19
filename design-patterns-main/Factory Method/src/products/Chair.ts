import { Product } from "../interfaces/product.interface";

export class Chair implements Product {
    public operation(): string {
        return 'Result of Chair';
    }
}