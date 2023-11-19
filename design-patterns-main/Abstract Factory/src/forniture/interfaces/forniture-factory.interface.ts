import { IChair } from "../../chairs/interfaces/chair.interface";
import { ISofa } from "../../sofa/interfaces/sofa.interface";
import { ITable } from "../../table/interfaces/table.interface";

export interface IFornitureFactory {
    createChair(): IChair;
    createSofa(): ISofa;
    createTable(): ITable;
}
