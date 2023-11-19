import { Product } from "../interfaces/product.interface";
import { Chair } from "../products/Chair";
import { Creator } from "./Creator";

export class ChairCreator extends Creator {
    public factoryMetohd(): Product {
        return new Chair();
    }
}