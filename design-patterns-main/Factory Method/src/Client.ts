import { ChairCreator } from "./creators/ChairCreator";
import { Creator } from "./creators/Creator";
import { TableCreator } from "./creators/TableCreator";

export class Client {
    clientCode(creator: Creator) {
        console.log("Client: I'm not aware of the creator's class, but it still works.");
        console.log(creator.someOperation());
    }

    createProducts() {
        console.log('App: Launched with the Chair');
        this.clientCode(new ChairCreator());
        // Creator: The same creator's code has just worked with Result of Chair
        
        console.log('App: Launched with the Table');
        this.clientCode(new TableCreator());
        // Creator: The same creator's code has just worked with Result of Table
    }
}