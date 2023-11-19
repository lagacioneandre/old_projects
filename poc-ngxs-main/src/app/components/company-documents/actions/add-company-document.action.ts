import { ICompanyDocument } from "../models/company-document.interface";

export class AddCompanyDocument {
    static readonly type = '[CompanyDocument] AddCompanyDocument';
    constructor (public document: ICompanyDocument) {}
}