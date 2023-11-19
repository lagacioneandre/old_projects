export class BmwI8 {
    public parts: string[] = [];

    public listParts(): void {
        console.log(`Bmw I8 parts: ${this.parts.join(', ')}\n`);
    }
}