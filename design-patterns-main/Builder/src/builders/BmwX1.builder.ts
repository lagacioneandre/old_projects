import { BmwX1 } from "../cars/BmwX1";
import { Builder } from "../interfaces/builder.interface";

export class BmwX1Builder implements Builder {
    private bmwX1: BmwX1;

    constructor() {
        this.reset();
    }

    public reset(): void {
        this.bmwX1 = new BmwX1();
    }

    public setPorts(): void {
        this.bmwX1.parts.push('4 portas');
    }

    public setEngine(): void {
        this.bmwX1.parts.push('Motor 3.0');
    }

    public setGPS(): void {
        this.bmwX1.parts.push('GPS padrao');
    }
    
    public getCar(): BmwX1 {
        const result = this.bmwX1;
        this.reset();
        return result;
    }
}