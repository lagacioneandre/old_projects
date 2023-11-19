import { createFeatureSelector, createSelector, select, State, Store } from "@ngrx/store";
import { filter, map } from "rxjs";
import { ICompanyDocument } from "../models/company-document.interface";

export interface AppState {
    companyDocuments: ICompanyDocument[];
}

// const feature = createSelector()

export const documentList = () => createSelector(
    (state: any) => state.companyDocuments,
    documents => documents
)

export const hasCompanyDocuments = () => createSelector(
    (state: any) => state.companyDocuments,
    document => !!document.length
)