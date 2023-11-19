export class SortContacts {
    public static SortContacts(_contactsList: Array<object>): Array<object> {
        let _myContacts: Array<object> = [];

        _contactsList.map(contact => {
            let tempContact: object;
            tempContact = contact['payload'].val();
            tempContact['id'] = contact['payload'].key;
            _myContacts.push(tempContact);
        });

        return this.setDefaultValues(_myContacts.sort(this.orderContacts));
    }

    private static orderContacts(a, b): number {
        if (a.nomeContato < b.nomeContato) {
            return -1;
        } else if (a.nomeContato > b.nomeContato) {
            return 1;
        } else {
            return 0;
        }
    }

    private static setDefaultValues(_contactsList: Array<object>): Array<object> {
        let indexContacts: Array<string> = [];

        for (let _contact of _contactsList) {
            const nameContact = _contact['nomeContato'];
            const letterForIndex = nameContact.substr(0, 1);
            const hasLetter = indexContacts.indexOf(letterForIndex);
            _contact['imgColor'] = this.sortyColor();
            _contact['selected'] = false;
            _contact['showOptions'] = false;

            if (hasLetter === -1) {
                indexContacts.push(letterForIndex);
            }
        }

        return this.contactsByIndex(indexContacts.sort(), _contactsList);
    }

    public static sortyColor() {
        const r = Math.ceil(Math.random() * 150);
        const g = Math.ceil(Math.random() * 150);
        const b = Math.ceil(Math.random() * 150);

        return 'rgb(' + r + ',' + g + ',' + b + ')';
    }

    private static contactsByIndex(_indexContacts: Array<any>, _contactsList: Array<object>): Array<object> {
        let _orderedContacts: Array<object> = [];

        for (let i = 0; i < _indexContacts.length; i++) {
            _orderedContacts.push({
                index: _indexContacts[i],
                contacts: []
            });

            for (let j = 0; j < _contactsList.length; j++) {
                if (_indexContacts[i] === _contactsList[j]['nomeContato'].substr(0, 1)) {
                    _orderedContacts[i]['contacts'].push(_contactsList[j]);
                }
            }
        }

        return _orderedContacts;
    }
}
