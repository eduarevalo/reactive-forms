import { AbstractControl, AbstractControlOptions, AsyncValidatorFn, FormArray, ValidatorFn } from '@angular/forms';

import { FormArrayOptions } from './form.models';

export class FormArrayExtended<T> extends FormArray {
    
    value: T;
    options: FormArrayOptions;

    constructor(
        public controls: AbstractControl[],
        validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null,
        asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null,
        formArrayOptions?: FormArrayOptions
    ) {
      super(controls, validatorOrOpts, asyncValidator);
      this.options = formArrayOptions;
    }

}