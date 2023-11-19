import { Injectable } from "@angular/core";
import { NgxsOnInit } from "@ngxs/store";
import { Action, Selector, State, StateContext, StateToken } from "@ngxs/store";
import { AddCompanyDocument } from "../actions/add-company-document.action";
import { UpdateCompanyDocument } from "../actions/update-company-document.action";
import { CompanyDocumentStateModel } from "../models/company-document-state.model";
import { CompanyDocumentsService } from "../services/company-documents.service";

const STATE_TOKEN = new StateToken<CompanyDocumentStateModel>('companyDocument');

@State<CompanyDocumentStateModel>({
    name: STATE_TOKEN,
    defaults: {
        documents: []
    }
})
@Injectable()
export class AddCompanyDocumentState implements NgxsOnInit {

    constructor (
        private companyDocumentsService: CompanyDocumentsService
    ) {}

    ngxsOnInit(ctx: StateContext<any>): void {
        this.companyDocumentsService.get().subscribe(documents => {
            ctx.patchState({documents});
          });
    }

    @Action(AddCompanyDocument)
    addCompanyDocument(ctx: StateContext<CompanyDocumentStateModel>, action: AddCompanyDocument) {
        const state = ctx.getState();
        ctx.patchState({
            documents: [
                ...state.documents,
                action.document
            ]
        });
    }

    @Action(UpdateCompanyDocument)
    updateCompanyDocument(ctx: StateContext<CompanyDocumentStateModel>, action: UpdateCompanyDocument) {
        // throw new Error(`erro`)
        this.companyDocumentsService.update().subscribe(() => {
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
    static hasDocuments(state: CompanyDocumentStateModel) {
        return !!state.documents.length;
    }
}