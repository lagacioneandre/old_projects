import { AudiCommand } from "./AudiCommand";
import { BmwCommand } from "./BmwCommand";
import { BmwReceiver } from "./BmwReceiver";
import { CarInvoker } from "./CarInvoker";

export class CarStore {
    makeAnOrder() {
        const invoker = new CarInvoker();
        const bmwReceiver = new BmwReceiver();
        invoker.setAudi(new AudiCommand('Q9'));
        invoker.setBmw(new BmwCommand(bmwReceiver, 'X9', 'GS 1250'));
        invoker.buildCars();
    }
}