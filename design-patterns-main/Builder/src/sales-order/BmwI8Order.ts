import { BmwI8Builder } from "../builders/BmwI8.builder";
import { Director } from "../directors/Director";

export class BmwI8Order {
    private builder = new BmwI8Builder();
    private director: Director;

    constructor(director: Director) {
        this.director = director;
        this.director.setBuilder(this.builder);
    }

    basicOrder() {
        console.log('standard basic product:');
        this.director.buildMinimalViableProduct();
        this.builder.getCar().listParts();
    }

    completeOrder() {
        console.log('Standard full featured product:');
        this.director.buildFullFeaturedProduct();
        this.builder.getCar().listParts();
    }
    
    customOrder() {
        console.log('Custom product:');
        this.builder.setEngine();
        this.builder.setGPS();
        this.builder.getCar().listParts();
    }
}