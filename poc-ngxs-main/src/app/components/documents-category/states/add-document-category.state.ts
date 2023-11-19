import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext, StateToken } from "@ngxs/store";
import { AddDocumentCategory } from "../actions/add-document-category.action";
import { UpdateDocumentCategory } from "../actions/update-document-category.action";
import { DocumentsCategoryStateModel } from "../models/document-category-state.model";
import { DocumentState } from "../models/documents-state.interface";
import { DocumentsCategoryService } from "../services/documents-category.service";

const STATE_TOKEN = new StateToken<DocumentState>('documentsCategory');

@State<DocumentsCategoryStateModel>({
    name: STATE_TOKEN,
    defaults: {
        documents: []
    }
})
@Injectable()
export class AddDocumentCategoryState {

    constructor (
        private documentsCategoryService: DocumentsCategoryService,
    ) {}

    @Action(AddDocumentCategory)
    addDocumentCategory(ctx: StateContext<DocumentsCategoryStateModel>, action: AddDocumentCategory) {
        // aqui é uma função que é executado sempre que a ação é chamada,
        // é possível "tratar" a informação antes de salva-la na store no patchState
        const state = ctx.getState();
        ctx.patchState({
            documents: [
                ...state.documents,
                action.document
            ]
        });
    }

    @Action(UpdateDocumentCategory)
    updateDocumentCategory(ctx: StateContext<DocumentsCategoryStateModel>, action: AddDocumentCategory) {
        this.documentsCategoryService.update().subscribe(() => {
            const state = ctx.getState();
            let updatedDocuments = JSON.parse(JSON.stringify(state.documents));
            const index = updatedDocuments.findIndex((item: any) => item.id === action.document.id);
            updatedDocuments.splice(index, 1, action.document);
            ctx.patchState({
                documents: [
                    ...updatedDocuments
                ]
            });
        });
    }

    @Selector()
    static hasCategories(state: DocumentState) {
        return !!state.documents.length;
    }
}