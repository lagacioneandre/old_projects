import { createAction, props } from "@ngrx/store";
import { IDocumentCategory } from "../models/document-category.interface";

export const addDocumentCategory = createAction(
    '[Documents] AddDocumentCategory',
    props<{ category: IDocumentCategory }>()
);