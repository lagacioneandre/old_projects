import { BmwI8 } from "../cars/BmwI8";
import { Builder } from "../interfaces/builder.interface";

export class BmwI8Builder implements Builder {
    private bmwI8: BmwI8;

    constructor() {
        this.reset();
    }

    public reset(): void {
        this.bmwI8 = new BmwI8();
    }

    public setPorts(): void {
        this.bmwI8.parts.push('2 portas');
    }

    public setEngine(): void {
        this.bmwI8.parts.push('Motor v12');
    }

    public setGPS(): void {
        this.bmwI8.parts.push('GPS premium');
    }
    
    public getCar(): BmwI8 {
        const result = this.bmwI8;
        this.reset();
        return result;
    }
}