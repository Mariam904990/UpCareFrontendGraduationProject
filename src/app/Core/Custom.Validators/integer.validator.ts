import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function integerValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;
        if (value == null || value === '') {
            return null; // Don't validate empty values to allow for optional fields
        }
        const isInteger = Number.isInteger(Number(value));
        return isInteger ? null : { notInteger: { value } };
    };
}