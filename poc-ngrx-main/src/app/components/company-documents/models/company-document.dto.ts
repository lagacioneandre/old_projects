export class CompanyDocumentDTO {
    id: string;
    title: string;
    description: string;
    isRequired: boolean;
    uploaded: boolean;

    constructor (id = '', title = '', description = '', isRequired = false, uploaded = false) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.isRequired = isRequired;
        this.uploaded = uploaded;
    }
}