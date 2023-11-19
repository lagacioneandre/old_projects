export class Receiver {
    doSomething(a: string): void {
        console.log(`Receiver: Working on (${a}.)`);
    }

    doSomethingElse(b: string): void {
        console.log(`Receiver: Also working on (${b}).`);
    }
}