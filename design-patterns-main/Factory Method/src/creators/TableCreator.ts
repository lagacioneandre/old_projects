import { Product } from "../interfaces/product.interface";
import { Table } from "../products/Table";
import { Creator } from "./Creator";

export class TableCreator extends Creator {
    public factoryMetohd(): Product {
        return new Table();
    }
}