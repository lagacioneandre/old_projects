import { Receiver } from "./Reciever";
import { Command } from "./command.interface";

export class ComplexCommand implements Command {
    private receiver: Receiver;
    private a: string;
    private b: string;

    constructor(receiver: Receiver, a: string, b: string) {
        this.receiver = receiver;
        this.a = a;
        this.b = b;
    }

    execute(): void {
        console.log('ComplexCommand: Complex stuff should be done by a receiver objetc.');
        this.receiver.doSomething(this.a);
        this.receiver.doSomethingElse(this.b);
    }
}