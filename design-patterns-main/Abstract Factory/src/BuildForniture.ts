import { FornitureType } from "./enums/forniture-type.enum";
import { ArtdecoFornitureFactory } from "./forniture/ArtdecoFornitureFactory";
import { ModernFornitureFactory } from "./forniture/ModernFornitureFactory";
import { VictorianFornitureFactory } from "./forniture/VictorianFornitureFactory";
import { IFornitureFactory } from "./forniture/interfaces/forniture-factory.interface";

export class BuildForniture {

    constructor() {
        const factory = this.build(FornitureType.ARTDECO);
        const chair = factory.createChair();
        const sofa = factory.createSofa();
        const table = factory.createTable();
    }

    build(fornitureType: FornitureType): IFornitureFactory {
        if (fornitureType === FornitureType.MODERN) {
            return new ModernFornitureFactory();
        } else if (fornitureType === FornitureType.VICORIAN) {
            return new VictorianFornitureFactory();
        } else if (fornitureType === FornitureType.ARTDECO) {
            return new ArtdecoFornitureFactory();
        }

        return new ArtdecoFornitureFactory();
    }
}
