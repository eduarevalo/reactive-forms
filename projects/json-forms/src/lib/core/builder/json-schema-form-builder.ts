import { Validators, ValidatorFn } from '@angular/forms';

import { FormControlExtended } from '../forms/form-control-extended';
import { FormArrayExtended } from '../forms/form-array-extended';
import { FormGroupExtended } from '../forms/form-group-extended';
import { JsonSchema } from '../schema/json-schema';
import { FormArrayExtendedOptions } from '../forms/form.models';

const VALIDATORS_MAPPING = {
    required: (property, name, parentSchema): ValidatorFn => parentSchema.required && parentSchema.required.find( reqProp => name === reqProp ) ? Validators.required : null,
    maximum: (property): ValidatorFn => property.maximum != undefined ? Validators.max(property.maximum) : null,
    minimum: (property): ValidatorFn => property.minimum != undefined ? Validators.min(property.minimum) : null,
    maxLength: (property): ValidatorFn => property.maxLength != undefined ? Validators.maxLength(property.maxLength) : null,
    minItems: (property): ValidatorFn => property.minItems != undefined ? Validators.minLength(property.minItems) : null,
    maxItems: (property): ValidatorFn => property.maxItems != undefined ? Validators.maxLength(property.maxItems) : null,
}

export class JsonSchemaFormBuilder {

    static build<T>(schemaId: string): FormGroupExtended<T> | FormArrayExtended<T> | FormControlExtended<T> {
        const parser = new JsonSchema();
        const schema = parser.getSchema(schemaId);
        return this._build<T>(schema, schemaId);
    }

    private static _build<T>(schema, name, parentSchema?): FormGroupExtended<T> | FormArrayExtended<T> | FormControlExtended<T> {
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

        const controls = Object
            .keys(schema.properties)
            .reduce( (controls, name) => {
                controls[name] = this._build(schema.properties[name], name, schema);
                return controls;
            }, {});

        return new FormGroupExtended<T>(controls);
    }

    static buildArray<T>(schema, name, parentSchema?): FormArrayExtended<T> {
        
        const validators = Object
            .values(VALIDATORS_MAPPING)
            .map( validator => validator(schema, name, parentSchema))
            .filter( validator => validator );
        
        const options: FormArrayExtendedOptions = {
                validators,
                newItem: () => this._build(schema.items, name, schema)      
            }
        return new FormArrayExtended<T>([], options);
    }

    static buildControl<T>(schema, name, parentSchema?): FormControlExtended<any> {

        const validators = Object
            .values(VALIDATORS_MAPPING)
            .map( validator => validator(schema, name, parentSchema))
            .filter( validator => validator );

        switch(schema.type) {
            case 'number':
                return new FormControlExtended<Number>(null, { validators, type: Number });
            case 'boolean':
                return new FormControlExtended<Boolean>(null, { validators, type: Boolean });
            default:
                return new FormControlExtended<String>(null, { validators, type: String }); 
        }
    }

}