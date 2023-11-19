import { VictorianChair } from "../chairs/VictorianChair";
import { VictorianSofa } from "../sofa/VictorianSofa";
import { VictorianTable } from "../table/VictorianTable";
import { IFornitureFactory } from "./interfaces/forniture-factory.interface";

export class VictorianFornitureFactory implements IFornitureFactory {

    constructor() {}

    createChair() {
        return new VictorianChair();
    };

    createSofa() {
        return new VictorianSofa();
    };

    createTable() {
        return new VictorianTable();
    };

}
