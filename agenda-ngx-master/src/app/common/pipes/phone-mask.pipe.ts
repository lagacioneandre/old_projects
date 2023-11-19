import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
    name: 'phoneMask'
})
export class PhonePipe implements PipeTransform {
    transform(value: string) {
        let _maskeredValue = '-';
        let _normalizeValue = value.replace(/\D/gi, '');

        if (_normalizeValue.length <= 10) {
            _maskeredValue = _normalizeValue.replace(/^([0-9]{2})([0-9]{4})([0-9]{4})$/gi, '($1) $2-$3');
        } else {
            _maskeredValue = _normalizeValue.replace(/^([\d]{2})([\d])([\d]{4})([\d]{4})$/gi, '($1) $2 $3-$4');
        }

        return _maskeredValue;
    }
}
