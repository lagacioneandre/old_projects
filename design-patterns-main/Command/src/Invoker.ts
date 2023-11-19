import { Command } from "./command.interface";

export class Invoker {
    private onStart: Command;
    private onFinish: Command;

    setOnStart(command: Command): void {
        this.onStart = command;
    }

    setOnFinish(command: Command): void {
        this.onFinish = command;
    }

    doSomethingImportant(): void {
        console.log('Invoker: Does anybody want something done befor i begin?');
        if (this.isCommand(this.onStart)) {
            this.onStart.execute();
        }

        console.log('Invoker: ...doing something really important...');
        console.log('Invoker: Does anybody want something done after I finish?');
        if (this.isCommand(this.onFinish)) {
            this.onFinish.execute();
        }
    }

    private isCommand(objetc: Command): boolean {
        return objetc.execute !== undefined
    }
}