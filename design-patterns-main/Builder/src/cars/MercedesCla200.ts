export class MercedesCla200 {
    public parts: string[] = [];

    public listParts(): void {
        console.log(`Mercedes CLA200 parts: ${this.parts.join(', ')}\n`);
    }
}