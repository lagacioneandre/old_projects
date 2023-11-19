export class ShowMoreOption {
    public static Show(event: any, contact: object): string {
        let topValue = '';
        const elementRects = event.target.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (elementRects.y > windowHeight / 2) {
            topValue = '-95px';
        }

        contact['showOptions'] = false;

        if (!contact['selected']) {
            contact['showOptions'] = false;

            setTimeout(() => {
                contact['showOptions'] = true;
            }, 100);
        }

        return topValue;
    }
}
