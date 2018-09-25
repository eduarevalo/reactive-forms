import { Component } from '@angular/core';
import { PERSON_SCHEMA_ID } from 'projects/json-forms/src/public_api';
import { JsonSchema } from 'projects/json-forms/src/lib/core/schema/json-schema';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'reactive-forms';
  
  schemaId = PERSON_SCHEMA_ID;
  
  steps = [
    { name: 'children', controls: ['children'], visible: true },
    { name: 'Age', controls: ['age'], visible: true },
    { name: 'Personal Information', controls: ['firstName', 'lastName'], visible: true},
    { name: 'Address', controls: ['address'], visible: true}
  ];

  onSubmit({ data }){
    const schema = new JsonSchema();
    const valid = schema.validate(this.schemaId, data);
    alert(`Validation: ${valid}`);
  }

  onNext({index, data}) {
    const addressStep = this.steps.find( step => step.name === 'Address');
    if (addressStep) {
      addressStep.visible = data.age !== 35;
    }
  }

}
