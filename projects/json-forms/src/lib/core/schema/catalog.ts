
import * as addressSchema from './json/address.schema.json';
import * as personSchema from './json/person.schema.json';

export const ADDRESS_SCHEMA = addressSchema.default;
export const PERSON_SCHEMA = personSchema.default;
export const ADDRESS_SCHEMA_ID = ADDRESS_SCHEMA.$id;
export const PERSON_SCHEMA_ID = PERSON_SCHEMA.$id;

export const CATALOG = {
    ADDRESS_SCHEMA_ID: ADDRESS_SCHEMA,
    PERSON_SCHEMA_ID: PERSON_SCHEMA
};