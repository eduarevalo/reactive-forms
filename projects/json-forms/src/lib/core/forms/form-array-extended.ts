import { AbstractControl, FormArray } from '@angular/forms';

import { FormArrayExtendedOptions } from './form.models';

export class FormArrayExtended<T> extends FormArray {
    
    value: T;
    options: FormArrayExtendedOptions;

    constructor(
        public controls: AbstractControl[],
        validatorOrOpts?: FormArrayExtendedOptions
    ) {
      super(controls, validatorOrOpts);
      this.options = validatorOrOpts;
    }

}