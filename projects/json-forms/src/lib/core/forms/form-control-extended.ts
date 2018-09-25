import { AbstractControlOptions, AsyncValidatorFn, FormControl, ValidatorFn } from '@angular/forms';
import { FormControlOptions } from './form.models';

export class FormControlExtended<T> extends FormControl {

    value: T;
    options: FormControlOptions;

    constructor(
        private type,
        validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null,
        asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null,
        formControlOptions?: FormControlOptions | null
    ) {
        super(undefined, validatorOrOpts, asyncValidator);
        this.options = formControlOptions;
    }

    setValue(value: any, options: {
        onlySelf?: boolean,
        emitEvent?: boolean,
        emitModelToViewChange?: boolean,
        emitViewToModelChange?: boolean
    } = {}): void {
        if (this.type === Boolean) {
            return super.setValue(value != null ? Boolean(value) : undefined, options);
        } else if (this.type === Number) {
            return super.setValue(value ? Number(value) : undefined, options);
        }
        return super.setValue(value ? value : undefined, options);
    }

}
