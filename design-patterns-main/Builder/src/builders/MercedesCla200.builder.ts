import { MercedesCla200 } from "../cars/MercedesCla200";
import { Builder } from "../interfaces/builder.interface";

export class MercedesCla200Builder implements Builder {
    private mercedesCla200: MercedesCla200;

    constructor() {
        this.reset();
    }

    public reset(): void {
        this.mercedesCla200 = new MercedesCla200();
    }

    public setPorts(): void {
        this.mercedesCla200.parts.push('2 portas');
    }

    public setEngine(): void {
        this.mercedesCla200.parts.push('Motor 2.0');
    }

    public setGPS(): void {
        this.mercedesCla200.parts.push('GPS premium');
    }
    
    public getCar(): MercedesCla200 {
        const result = this.mercedesCla200;
        this.reset();
        return result;
    }
}