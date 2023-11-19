import { Product } from "../interfaces/product.interface";

export abstract class Creator {
    public abstract factoryMetohd(): Product;

    public someOperation(): string {
        const product = this.factoryMetohd();
        return `Creator: The same creator's code has just worked with ${product.operation()}`
    }
}