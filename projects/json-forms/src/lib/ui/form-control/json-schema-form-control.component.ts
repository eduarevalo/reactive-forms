import { Component, Input } from "@angular/core";

import { FormGroupExtended } from "../../core/forms/form-group-extended";
import { FormControlExtended } from "../../core/forms/form-control-extended";
import { FormArrayExtended } from "../../core/forms/form-array-extended";

@Component({
    selector: 'json-schema-form-control',
    styleUrls: ['./json-schema-form-control.component.scss'],
    templateUrl: './json-schema-form-control.component.html'
})
export class JsonSchemaFormControlComponent {

    @Input() controls: Array<string>;
    @Input() form: FormGroupExtended<{[name: string]: FormControlExtended<any>}>;
    
    isFormControl(name): boolean {
        return this.form.controls[name] instanceof FormControlExtended;
    }

    isFormGroup(name): boolean {
        return this.form.controls[name] instanceof FormGroupExtended;
    }

    isFormArray(name): boolean {
        return this.form.controls[name] instanceof FormArrayExtended;
    }

}