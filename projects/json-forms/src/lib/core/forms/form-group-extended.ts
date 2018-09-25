import { AbstractControl, AbstractControlOptions, AsyncValidatorFn, FormGroup, ValidatorFn } from '@angular/forms';
import { FormGroupOptions } from './form.models';

export class FormGroupExtended<T> extends FormGroup {
    
    value: T;
    options: FormGroupOptions;
    
    constructor(
        public controls: {[key: string]: AbstractControl},
        validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null,
        asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null,
        formGroupOptions?: FormGroupOptions | null
    ) {
      super(controls, validatorOrOpts, asyncValidator);
      this.options = formGroupOptions;
    }

}
