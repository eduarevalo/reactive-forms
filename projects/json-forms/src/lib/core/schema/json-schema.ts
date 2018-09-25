import * as Ajv from 'ajv';
import { CATALOG } from './catalog';

export class JsonSchema {

    ajv =  new Ajv();

    constructor(){
        Object.keys(CATALOG).map( id => this.ajv.addSchema(CATALOG[id], id) );
    }

    getSchema(schemaId: string): any {
        return this.ajv.getSchema(schemaId).schema;
    }

    validate(schemaId, data): any {
        return this.ajv.validate(schemaId, data);
    }

}