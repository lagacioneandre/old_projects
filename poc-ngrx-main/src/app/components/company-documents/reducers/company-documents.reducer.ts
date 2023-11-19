import { createReducer, on } from "@ngrx/store";
import { addCompanyDocument } from "../actions/add-company-document.action";
import { updateCompanyDocument } from "../actions/update-company-document.action";
import { ICompanyDocument } from "../models/company-document.interface";

const initialState: ICompanyDocument[] = [];

export const companyDocumentReducer = createReducer(
    initialState,
    on(addCompanyDocument, (state, { document }) => ([...state, document])),
    on(updateCompanyDocument, (state, { document }) => {
        const clone: ICompanyDocument[] = JSON.parse(JSON.stringify(state));
        const index = clone.findIndex(item => item.id === document.id);
        clone.splice(index, 1, document);
        return [...clone];
    }),
);