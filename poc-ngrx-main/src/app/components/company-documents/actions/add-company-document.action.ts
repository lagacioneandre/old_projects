import { createAction, props } from "@ngrx/store";
import { ICompanyDocument } from "../models/company-document.interface";

export const addCompanyDocument = createAction(
    '[CompanyDocument] AddCompanyDocument',
    props<{ document: ICompanyDocument }>()
)