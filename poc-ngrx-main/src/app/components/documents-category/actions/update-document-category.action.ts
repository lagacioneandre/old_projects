import { createAction, props } from "@ngrx/store";

export const updateDocumentCategory = createAction(
    '[Documents] UpdateDocumentCategory',
    props<{ categoryId: string }>()
);