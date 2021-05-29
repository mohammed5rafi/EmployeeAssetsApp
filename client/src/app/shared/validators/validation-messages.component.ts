import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ValidationService } from 'app/services/validation/validation.service';

@Component({
  selector: "validation-messages",
  template: `<div class="alert alert-danger" *ngIf="errorMessage">
    <i class="fa fa-info-circle"></i> {{ errorMessage }}
  </div>`,
})
export class ValidationMessagesComponent {
  @Input() control: FormControl;
  constructor() {}

  get errorMessage() {
    for (const propertyName in this.control.errors) {
      if (
        this.control.errors.hasOwnProperty(propertyName) &&
        (this.control.dirty || this.control.touched)
      ) {
        return ValidationService.getValidatorErrorMessage(
          propertyName,
          this.control.errors[propertyName]
        );
      }
    }

    return null;
  }
}
