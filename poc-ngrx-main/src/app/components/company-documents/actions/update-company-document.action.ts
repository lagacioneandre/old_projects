import { createAction, props } from "@ngrx/store";
import { ICompanyDocument } from "../models/company-document.interface";

export const updateCompanyDocument = createAction(
    '[CompanyDocument] UpdateCompanyDocument',
    props<{ document: ICompanyDocument }>()
);