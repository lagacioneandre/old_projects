import { ArtdecoChair } from "../chairs/ArtdecoChair";
import { ArtdecoSofa } from "../sofa/ArtdecoSofa";
import { ArtdecoTable } from "../table/ArtdecoTable";
import { IFornitureFactory } from "./interfaces/forniture-factory.interface";

export class ArtdecoFornitureFactory implements IFornitureFactory {

    constructor() {}

    createChair() {
        return new ArtdecoChair();
    };

    createSofa() {
        return new ArtdecoSofa();
    };

    createTable() {
        return new ArtdecoTable();
    };

}
