export class DocumentCategoryDTO {
    title: string;
    description: string;
    completed: boolean;
    route: string;
    id: string;

    constructor(title = '', description = '', completed = false, route = '', id = '') {
        this.title = title;
        this.description = description;
        this.completed = completed;
        this.route = route;
        this.id = id;
    }
}