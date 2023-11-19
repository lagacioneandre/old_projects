import { Originator } from "./Originator";
import { Memento } from "./interfaces/Memento";

export class Caretaker {
    private mementos: Memento[] = [];
    private originator: Originator;

    constructor(originator: Originator) {
        this.originator = originator;
    }

    public backup(): void {
        console.log(`\n Caretaker: Saving Originator's state...`);
        this.mementos.push(this.originator.save());
    }

    public undo(): void {
        if (!this.mementos.length) return;
        const memento = this.mementos.pop();
        if (memento) {
            console.log(`Caretaker: Restoring state to: ${memento?.getName()}`);
            this.originator.restore(memento);
        }
    }

    public showHistory(): void {
        console.log(`Caretaker: Here's the list of mementos:`);
        for (const memento of this.mementos) {
            console.log(memento.getName());
        }
    }
}