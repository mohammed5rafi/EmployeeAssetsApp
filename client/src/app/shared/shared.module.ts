import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

import { EmployeeAssetsGlobalvariables } from './employee-Assets.modal';
import { ValidationMessagesComponent } from './validators/validation-messages.component';

@NgModule({
  declarations: [ValidationMessagesComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot({
      timeOut: 1000,
      preventDuplicates: true,
    }),
    HttpClientModule,
  ],
  providers: [EmployeeAssetsGlobalvariables],
  exports: [ValidationMessagesComponent, FormsModule, ReactiveFormsModule],
})
export class SharedModule {}
