import { AbstractControlOptions } from '@angular/forms';

export interface AbstractControlExtendedOptions extends AbstractControlOptions {
}

export interface FormControlExtendedOptions extends AbstractControlOptions {
    type: any;
}

export interface FormArrayExtendedOptions extends AbstractControlExtendedOptions {
    newItem: Function
}

export interface FormGroupExtendedOptions extends AbstractControlExtendedOptions {

}
