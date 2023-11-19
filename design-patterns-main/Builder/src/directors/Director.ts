import { Builder } from "../interfaces/builder.interface";

export class Director {
    private builder: Builder;

    public setBuilder(builder: Builder): void {
        this.builder = builder;
    }

    public buildMinimalViableProduct(): void {
        this.builder.setEngine();
    }

    public buildFullFeaturedProduct(): void {
        this.builder.setEngine();
        this.builder.setPorts();
        this.builder.setGPS();
    }
}