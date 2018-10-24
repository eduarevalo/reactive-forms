import { AbstractControl, AbstractControlOptions, AsyncValidatorFn, FormGroup, ValidatorFn } from '@angular/forms';
import { FormGroupExtendedOptions } from './form.models';

export class FormGroupExtended<T> extends FormGroup {
    
    value: T;
    options: FormGroupExtendedOptions;
    
    constructor(
        public controls: {[key: string]: AbstractControl},
        validatorOrOpts?: FormGroupExtendedOptions
    ) {
      super(controls, validatorOrOpts);
      this.options = validatorOrOpts;
    }

}
