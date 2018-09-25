import { Component, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
    selector: 'json-schema-question-group',
    styleUrls: ['./json-schema-question-group.component.scss'],
    templateUrl: './json-schema-question-group.component.html'
})
export class JsonSchemaQuestionGroupComponent {

    @Input() name: string;
    @Input() form: FormGroup;

    get controlNames() {
        return Object.keys(this.form.controls);
    }

}