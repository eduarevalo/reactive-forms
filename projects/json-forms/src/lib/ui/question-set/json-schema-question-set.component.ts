import { Component, Input } from "@angular/core";
import { FormArrayExtended } from "../../core/forms/form-array-extended";

@Component({
    selector: 'json-schema-question-set',
    styleUrls: ['./json-schema-question-set.component.scss'],
    templateUrl: './json-schema-question-set.component.html'
})
export class JsonSchemaQuestionSetComponent {

    @Input() name: string;
    @Input() form: FormArrayExtended<any>;

    get controls(): Array<string>{
        return Object.keys(this.form.controls);
    }

    onClickAdd(){
        this.form.push(this.form.options.newItem());
    }

    getKeys(data){
        return data ? Object.keys(data) : [];
    }

}