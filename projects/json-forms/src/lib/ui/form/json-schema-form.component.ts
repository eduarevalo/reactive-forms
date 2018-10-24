import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { FormGroupExtended } from "../../core/forms/form-group-extended";
import { JsonSchemaFormBuilder } from "../../core/builder/json-schema-form-builder";
import { FormControlExtended } from "../../core/forms/form-control-extended";
import { FormArrayExtended } from "../../core/forms/form-array-extended";

@Component({
    selector: 'json-schema-form',
    styleUrls: ['./json-schema-form.component.scss'],
    templateUrl: './json-schema-form.component.html'
})
export class JsonSchemaFormComponent implements OnInit {

    @Input() schemaId: string;
    @Input() data: any;
    @Input() steps: Array<{ name: string, controls: Array<string>, visible: boolean }>;

    @Output() clickSubmit: EventEmitter<any> = new EventEmitter<any>();
    @Output() clickBack: EventEmitter<any> = new EventEmitter<any>();
    @Output() clickNext: EventEmitter<any> = new EventEmitter<any>();

    form: FormGroupExtended<any>;
    index = 0;

    ngOnInit(){
        this.form = <FormGroupExtended<any>>JsonSchemaFormBuilder.build<any>(this.schemaId);
        if (this.data) {
            this.form.setValue(this.data);
        }
    }

    getKeys(data){
        return data ? Object.keys(data) : [];
    }

    stepIsValid(step): boolean {
        return !step.controls.find( name => {
            const control = this.form.controls[name];
            if (control instanceof FormArrayExtended) {
                if (control.controls.find( ctrl => !ctrl.valid)) {
                    return true;
                }
            }
            return !control.valid;
        });
    }

    isFormControl(name): boolean {
        return this.form.controls[name] instanceof FormControlExtended;
    }

    isFormGroup(name): boolean {
        return this.form.controls[name] instanceof FormGroupExtended;
    }

    isFormArray(name): boolean {
        return this.form.controls[name] instanceof FormArrayExtended;
    }

    onClickSubmit(){
        this.clickSubmit.emit({ data: this.form.value });
    }

    onClickBack(){
        this.index--;
        this.clickBack.emit({ index: this.index });
    }

    onClickNext(){
        this.index++;
        this.clickNext.emit({ index: this.index, data: this.form.value });
    }

    get visibleSteps() {
        return this.steps.filter( step => step.visible );
    }

}