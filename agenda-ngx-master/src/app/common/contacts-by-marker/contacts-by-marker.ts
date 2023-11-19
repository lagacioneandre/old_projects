export class ContactsByMarker {
    public static GetContacts(_contactsList: Array<object>, _markerId: string): Array<object> {
        let _copy: Array<Object> = [];

        for (let i = 0; i < _contactsList.length; i++) {
            let _index = _contactsList[i];
            _copy.push({
                index: _index['index'],
                contacts: []
            });

            for (let j = 0; j < _index['contacts'].length; j++) {
                let _contact = _index['contacts'][j];

                if (_contact['marcador'] === _markerId) {
                    _copy[i]['contacts'].push(_contact);
                }
            }
        }

        return this.removeEmptyList(_copy);
    }

    private static removeEmptyList(_contactsList: Array<object>): Array<object> {
        let _copy: Array<object> = [];

        for (let i = 0; i < _contactsList.length; i++) {
            let _index = _contactsList[i];

            if (_index['contacts'].length) {
                _copy.push(_index);
            }
        }

        return _copy;
    }
}
