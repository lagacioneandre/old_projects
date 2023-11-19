export class BmwX1 {
    public parts: string[] = [];

    public listParts(): void {
        console.log(`Bmw X1 parts: ${this.parts.join(', ')}\n`);
    }
}