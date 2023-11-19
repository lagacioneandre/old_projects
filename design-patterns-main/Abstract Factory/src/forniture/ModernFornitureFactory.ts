import { ModernChair } from "../chairs/ModernChair";
import { ModernSofa } from "../sofa/ModernSofa";
import { ModernTable } from "../table/ModernTable";
import { IFornitureFactory } from "./interfaces/forniture-factory.interface";

export class ModernFornitureFactory implements IFornitureFactory {

    constructor() {}

    createChair() {
        return new ModernChair();
    };

    createSofa() {
        return new ModernSofa();
    };

    createTable() {
        return new ModernTable
    };

}
