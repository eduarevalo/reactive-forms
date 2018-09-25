import { Component, Input } from "@angular/core";
import { FormGroupExtended } from "../../core/forms/form-group-extended";
import { FormControlExtended } from "../../core/forms/form-control-extended";

@Component({
    selector: 'json-schema-question',
    styleUrls: ['./json-schema-question.component.scss'],
    templateUrl: './json-schema-question.component.html'
})
export class JsonSchemaQuestionComponent {

    @Input() name: string;
    @Input() form: FormGroupExtended<{[name: string]: FormControlExtended<any>}>;
    
    getKeys(data){
        return data ? Object.keys(data) : [];
    }

    get formControl() : FormControlExtended<any> {
        return <FormControlExtended<any>>this.form.controls[this.name];
    }

}