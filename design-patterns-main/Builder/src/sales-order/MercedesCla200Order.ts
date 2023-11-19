import { MercedesCla200Builder } from "../builders/MercedesCla200.builder";
import { Director } from "../directors/Director";

export class MercedesCla200Order {
    private builder = new MercedesCla200Builder();
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
        this.builder.setPorts();
        this.builder.getCar().listParts();
    }
}