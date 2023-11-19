import { Command } from "./command.interface";

export class AudiCommand implements Command {
    private model: string;

    constructor (model: string) {
        this.model = model;
    }

    public execute(): void {
        console.log(`Audi model selected is ${this.model}`);
    }
}