import { Validators, ValidatorFn } from '@angular/forms';

import { FormControlExtended } from '../forms/form-control-extended';
import { FormArrayExtended } from '../forms/form-array-extended';
import { FormGroupExtended } from '../forms/form-group-extended';
import { JsonSchema } from '../schema/json-schema';
import { FormGroupOptions, FormArrayOptions, FormControlOptions } from '../forms/form.models';

const VALIDATORS_MAPPING = {
    required: (property, name, parentSchema): ValidatorFn => parentSchema.required && parentSchema.required.find( reqProp => name === reqProp ) ? Validators.required : null,
    maximum: (property): ValidatorFn => property.maximum ? Validators.max(property.maximum) : null,
    minimum: (property): ValidatorFn => property.minimum ? Validators.min(property.minimum) : null,
    maxLength: (property): ValidatorFn => property.maxLength ? Validators.maxLength(property.maxLength) : null
}

export class JsonSchemaFormBuilder {

    static build<T>(schemaId: string): FormGroupExtended<T> {
        const parser = new JsonSchema();
        const schema = parser.getSchema(schemaId);
        return this.buildGroup<T>(schema, schemaId);
    }

    private static _build<T>(schema, name, parentSchema?): FormGroupExtended<T> | FormArrayExtended<T> | FormControlExtended<T>{
        switch (schema.type) {
            case "object":
                return this.buildGroup<T>(schema, name, parentSchema);
            case "array":
                return this.buildArray<T>(schema, name, parentSchema);
            default:
                return this.buildControl<T>(schema, name, parentSchema);
        }
    }

    static buildGroup<T>(schema, name, parentSchema?): FormGroupExtended<T> {
        const options: FormGroupOptions = {};

        const controls = Object
            .keys(schema.properties)
            .reduce( (controls, name) => {
                controls[name] = this._build(schema.properties[name], name, schema);
                return controls;
            }, {});

        return new FormGroupExtended<T>(controls, null, null, options);
    }

    static buildArray<T>(schema, name, parentSchema?): FormArrayExtended<T> {
        const options: FormArrayOptions = {
            newItem: () => this._build(schema.items, name, schema)
        };
        return new FormArrayExtended<T>([], null, null, options);
    }

    static buildControl<T>(schema, name, parentSchema?): FormControlExtended<any> {

        const type = schema.type;
        const options: FormControlOptions = {
            inputType: type === 'number'
                ? 'number'
                : 'text'
        };

        const validators = Object
            .values(VALIDATORS_MAPPING)
            .map( validator => validator(schema, name, parentSchema))
            .filter( validator => validator );

        return type === "number"
            ? new FormControlExtended<Number>(Number, validators, null, options)
            : type === "boolean"
            ? new FormControlExtended<Boolean>(Boolean, validators, null, options)
            : new FormControlExtended<String>(String, validators, null, options);
    }

}