import { IDocumentCategory } from "../models/document-category.interface";

export class AddDocumentCategory {
    static readonly type = '[Documents] AddDocumentCategory';
    constructor (public document: IDocumentCategory) {}
}