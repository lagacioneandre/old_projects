export namespace Todo {
    export class Add {
        static readonly type = '[Todo] Add';
        constructor (public payload: any) {}
    }

    export class Edit {
        static readonly type = '[Todo] Edit';
        constructor (public payload: any) {}
    }

    export class Delete {
        static readonly type = '[Todo] Delete';
        constructor (public payload: any) {}
    }
}