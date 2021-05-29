import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'app/services/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  public RegisterForm = new FormGroup({
    username: new FormControl("", [Validators.required]),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(8),
    ]),
  });

  constructor(
    private accountService: AccountService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {}
  OnRegister(valid) {
    if (valid) {
      this.accountService.register(this.RegisterForm.value).subscribe(
        (res) => {
          console.log(res);
          this.toastr.success("Successfully Registerd ");
        },
        (error) => {
          this.toastr.error(error.error);
        }
      );
    }
  }
}
