import { FormControl } from '@angular/forms';
import { FormControlExtendedOptions } from './form.models';

export class FormControlExtended<T> extends FormControl {

    value: T;
    options: FormControlExtendedOptions;

    constructor(
        formState: any = null,
        validatorOrOpts?: FormControlExtendedOptions
    ) {
        super(formState, validatorOrOpts);
        this.options = validatorOrOpts;
    }

    setValue(value: any, options: {
        onlySelf?: boolean,
        emitEvent?: boolean,
        emitModelToViewChange?: boolean,
        emitViewToModelChange?: boolean
    } = {}): void {
        if (this.options.type === Boolean) {
            return super.setValue(value != null ? Boolean(value) : undefined, options);
        } else if (this.options.type === Number) {
            return super.setValue(value ? Number(value) : undefined, options);
        }
        return super.setValue(value ? value : undefined, options);
    }

}
