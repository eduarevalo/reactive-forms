import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatStepperModule, MatButtonModule, MatCardModule } from '@angular/material';

import { JsonSchemaFormComponent } from './ui/form/json-schema-form.component';
import { JsonSchemaQuestionComponent } from './ui/question/json-schema-question.component';
import { JsonSchemaQuestionGroupComponent } from './ui/question-group/json-schema-question-group.component';
import { JsonSchemaQuestionSetComponent } from './ui/question-set/json-schema-question-set.component';
import { JsonSchemaFormControlComponent } from './ui/form-control/json-schema-form-control.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatStepperModule,
    ReactiveFormsModule
  ],
  declarations: [
    JsonSchemaFormComponent,
    JsonSchemaFormControlComponent, 
    JsonSchemaQuestionComponent, 
    JsonSchemaQuestionGroupComponent, 
    JsonSchemaQuestionSetComponent
  ],
  exports: [
    JsonSchemaFormComponent, 
    JsonSchemaFormControlComponent, 
    JsonSchemaQuestionComponent, 
    JsonSchemaQuestionGroupComponent, 
    JsonSchemaQuestionSetComponent
  ]
})
export class JsonFormsModule { }
