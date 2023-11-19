import { ICompanyDocument } from "../models/company-document.interface";

export class UpdateCompanyDocument {
    static readonly type = '[CompanyDocument] UpdateCompanyDocument';
    constructor (public document: ICompanyDocument) {}
}