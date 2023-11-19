import { Director } from "../directors/Director";
import { BmwI8Order } from "../sales-order/BmwI8Order";
import { BmwX1Order } from "../sales-order/BmwX1Order";
import { MercedesCla200Order } from "../sales-order/MercedesCla200Order";

export class CarStore {
    private director = new Director();

    bmwX1Order() {
        const order = new BmwX1Order(this.director);
        order.completeOrder();
    }

    mercedesCla200Order() {
        const order = new MercedesCla200Order(this.director);
        order.completeOrder();
    }

    bmwI8Order() {
        const order = new BmwI8Order(this.director);
        order.completeOrder();
    }
}