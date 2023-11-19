import { ComponentWithBackReference } from "./ComponentWithBackReference";
import { Prototype } from "./Prototype";

export class ClientCode {
    p1 = new Prototype();

    constructor() {
        this.p1.primitive = 245;
        this.p1.component = new Date();
        this.p1.circularReference = new ComponentWithBackReference(this.p1);
    }

    getObject() {
        const p2 = this.p1.clone();

        if (this.p1.primitive === p2.primitive) {
            console.log('Primitive field values have been carried over to a clone. Yay!');
        } else {
            console.log('Primitive field values have not been copied. Booo!');
        }

        if (this.p1.component === p2.component) {
            console.log('Simple component has not been cloned. Booo!');
        } else {
            console.log('Simple component has been cloned. Yay!');
        }
    
        if (this.p1.circularReference === p2.circularReference) {
            console.log('Component with back reference has not been cloned. Booo!');
        } else {
            console.log('Component with back reference has been cloned. Yay!');
        }
    
        if (this.p1.circularReference.prototype === p2.circularReference.prototype) {
            console.log('Component with back reference is linked to original object. Booo!');
        } else {
            console.log('Component with back reference is linked to the clone. Yay!');
        }
    }
}