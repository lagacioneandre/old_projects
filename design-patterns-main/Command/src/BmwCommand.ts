import { BmwReceiver } from "./BmwReceiver";
import { Command } from "./command.interface";

export class BmwCommand implements Command {
    private receiver: BmwReceiver;
    private carModel: string;
    private motorcycleModel: string;

    constructor (receiver: BmwReceiver, carModel: string, motorcycleModel: string) {
        this.receiver = receiver;
        this.carModel = carModel;
        this.motorcycleModel = motorcycleModel;
    }

    public execute(): void {
        this.receiver.createCar(this.carModel);
        this.receiver.createMotorcycle(this.motorcycleModel);
    }
}