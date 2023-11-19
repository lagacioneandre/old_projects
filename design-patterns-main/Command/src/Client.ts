import { ComplexCommand } from "./ComplexCommand";
import { Invoker } from "./Invoker";
import { Receiver } from "./Reciever";
import { SimpleCommand } from "./SimpleCommand";

export class Client {
    constructor() {
        const invoker = new Invoker();
        invoker.setOnStart(new SimpleCommand('Say Hi!'));

        const receiver = new Receiver();
        invoker.setOnFinish(new ComplexCommand(receiver, 'Send Email', 'Save Report'));

        invoker.doSomethingImportant();
    }
}