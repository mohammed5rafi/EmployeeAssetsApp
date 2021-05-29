import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: "root",
})
export class ValidationService {
  constructor() {}

  // function to set error messages
  static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
    const config = {
      required: "This field is required",
      twoDecimalAllowed: "Decimal value upto 3 decimal places is allowed.",
      invalidNumber: "Input should be an integer value",
      invalidCreditCard: "Is invalid credit card number",
      invalidEmailAddress: "Invalid email address",
      invalidPassword: "New password and confirm password does not match",
      invalidDob: "User must be minimum 16 Years old.",
      invalidUrl: "Invalid URL",
      alphaNumericAllowed: "Only alphanumeric input is allowed",
      mustBeAlphaNumeric: "Input should be alphanumeric",
      upperCaseCharacterOnly: "Only uppercase inputs allowed",
      alpahabetsAllowed: "Only alphbet  input is allowed",
      numericAllowed: "Only numeric values are allowed",
      emailTaken: "Email id already taken",
      minlength: `Minimum length should be ${validatorValue.requiredLength} characters`,
      maxlength: `Maximum length should be ${validatorValue.requiredLength} characters`,
      samecountry: `Country of origin and destination should be different.`,
      invalidWeight: "The gross weight should be greater than net weight",
      min: `Please enter a value greater than or equal to ${validatorValue.min}`,
      cannotContainSpace: "space is not allowed",
    };

    return config[validatorName];
  }

  static creditCardValidator(control: AbstractControl) {
    // Visa, MasterCard, American Express, Diners Club, Discover, JCB
    if (
      control.value.match(
        /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/
      )
    ) {
      return null;
    } else {
      return { invalidCreditCard: true };
    }
  }

  static emailValidator(control: AbstractControl) {
    if (
      control.value.length === 0 ||
      control.value.match(
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
      )
    ) {
      return null;
    } else {
      return { invalidEmailAddress: true };
    }
  }
  static mustBeAlphaNumericValidator(control: AbstractControl) {
    // Regex to check string is alphanumeric or not.
    if (
      control.value == null ||
      String(control.value).match(/^(?=.*[a-zA-Z])(?=.*[0-9])[A-Za-z0-9]+$/)
    ) {
      return null;
    } else {
      return { mustBeAlphaNumeric: true };
    }
  }

  static upperCaseValidator(control: AbstractControl) {
    // Regex to check string is alphanumeric or not.
    if (control.value == null || String(control.value).match(/^[A-Z0-9]*$/)) {
      return null;
    } else {
      return { upperCaseCharacterOnly: true };
    }
  }

  static alpaNumValidator(control: AbstractControl) {
    if (
      control.value == null ||
      String(control.value).match(/^[a-zA-Z0-9 ]*$/)
    ) {
      return null;
    } else {
      return { alphaNumericAllowed: true };
    }
  }
  static alpahabetsValidator(control: AbstractControl) {
    if (control.value == null || String(control.value).match(/^[a-zA-Z ]*$/)) {
      return null;
    } else {
      return { alpahabetsAllowed: true };
    }
  }

  static numberValidator(control: AbstractControl) {
    if (
      control.value == null ||
      control.value.length === 0 ||
      String(control.value).match(/^[0-9]*$/)
    ) {
      return null;
    } else {
      return { numericAllowed: true };
    }
  }

  static decimalValidation(control: AbstractControl) {
    if (
      control.value == null ||
      String(control.value).match(/^\d*\.?\d{0,3}$/g)
    ) {
      return null;
    } else {
      return { twoDecimalAllowed: true };
    }
  }

  // function to validate that dob should be 16 years old
  static dobValidator(control: AbstractControl) {
    const currentDate = new Date();
    if (control.value) {
      const dob = new Date(control.value);
      const dobYear = dob.getFullYear();
      const maxDobYear = currentDate.getFullYear() - 16;
      // console.log(dobYear, maxDobYear)
      if (maxDobYear < dobYear) {
        return { invalidDob: true };
      } else {
        return null;
      }
    }
  }

  static urlValidator(control: AbstractControl) {
    const URL_REGEXP =
      /^(http?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|in|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
    if (control.value.match(URL_REGEXP)) {
      return null;
    } else {
      return { invalidUrl: true };
    }
  }

  static confirmPasswordValidator(control: AbstractControl) {
    const password: string = control.get("password").value; // get password from our password form control
    const confirmPassword: string = control.get("confirmPassword").value; // get password from our confirmPassword form control
    if (password !== confirmPassword) {
      control.get("confirmPassword").setErrors({ invalidPassword: true });
    }
    return null;
  }
  static compareValidator(control: AbstractControl) {
    const CountryOfDestination: string =
      control.get("CountryOfDestination") == null
        ? ""
        : control.get("CountryOfDestination").value; // get countryOfDispatch from our countryOfDispatch form control
    const countryoforgin: string =
      control.get("CountryOfDispatch") == null
        ? ""
        : control.get("CountryOfDispatch").value;

    // get countryoforgin from our countryoforgin form control
    if (countryoforgin === CountryOfDestination) {
      control.get("CountryOfDestination").setErrors({ samecountry: true });
    } else {
      control.get("CountryOfDestination").setErrors(null);

      return null;
    }
    if (CountryOfDestination === "") {
      control.get("CountryOfDestination").setErrors({ required: true });
    }
  }
  static compareValueGreatValidator(control: AbstractControl) {
    const grossWeight: string =
      control.get("grossWeight") == null
        ? ""
        : control.get("grossWeight").value; // get grossWeight from our grossWeight form control
    const netWeight: string =
      control.get("netWeight") == null ? "" : control.get("netWeight").value; // get netWeight from our netWeight form control

    const isnetWeightGreater = parseFloat(netWeight) > parseFloat(grossWeight);
    const isgrossWeightGreater =
      parseFloat(netWeight) < parseFloat(grossWeight);

    if (isnetWeightGreater) {
      control.get("netWeight").setErrors({ invalidWeight: true });
      control.get("grossWeight").setErrors({ invalidWeight: true });
    } else {
      if (
        String(grossWeight).match(/^\d*\.?\d{0,2}$/g) &&
        grossWeight != "" &&
        String(netWeight).match(/^\d*\.?\d{0,2}$/g) &&
        netWeight != ""
      ) {
        control.get("grossWeight").setErrors(null);
        control.get("netWeight").setErrors(null);
      } else if (
        String(grossWeight).match(/^\d*\.?\d{0,2}$/g) &&
        grossWeight != ""
      ) {
        control.get("grossWeight").setErrors(null);
      } else if (
        String(netWeight).match(/^\d*\.?\d{0,2}$/g) &&
        netWeight != ""
      ) {
        control.get("netWeight").setErrors(null);
      }
    }
  }

  static spaceValidator(control: AbstractControl) {
    if ((control.value as string).indexOf(" ") >= 0) {
      return { cannotContainSpace: true };
    }

    return null;
  }
}
