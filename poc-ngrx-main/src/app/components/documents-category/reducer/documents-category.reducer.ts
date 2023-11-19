import { createReducer, on } from "@ngrx/store";
import { addDocumentCategory } from "../actions/add-document-category.action";
import { updateDocumentCategory } from "../actions/update-document-category.action";
import { IDocumentCategory } from "../models/document-category.interface";

const initialState: IDocumentCategory[] = [];

export const documentCategoryReducer = createReducer(
    initialState,
    on(addDocumentCategory, (state, { category }) => ([...state, category])),
    on(updateDocumentCategory, (state, { categoryId }) => {
        if (!state.length) return [...state];
        const clone: IDocumentCategory[] = JSON.parse(JSON.stringify(state));
        const categoryToUpadte = clone.filter(item => item.id === categoryId)[0];
        const index = clone.findIndex(item => item.id === categoryId);
        categoryToUpadte.completed = true;
        clone.splice(index, 1, categoryToUpadte);
        return [...clone];
    })
);