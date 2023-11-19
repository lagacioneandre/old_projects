import { Command } from "./command.interface";

export class CarInvoker {
    private bmwCommand: Command;
    private audiCommand: Command;

    setBmw(command: Command) {
        this.bmwCommand = command;
    }

    setAudi(command: Command) {
        this.audiCommand = command;
    }

    buildCars() {
        if (this.isCommand(this.bmwCommand)) {
            this.bmwCommand.execute();
        }

        if (this.isCommand(this.audiCommand)) {
            this.audiCommand.execute();
        }
    }

    private isCommand(object: Command): object is Command {
        return object.execute !== undefined;
    }
}
