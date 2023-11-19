import { IDocumentCategory } from "../models/document-category.interface";

export class UpdateDocumentCategory {
    static readonly type = '[Documents] UpdateDocumentCategory';
    constructor (public document: IDocumentCategory) {}
}