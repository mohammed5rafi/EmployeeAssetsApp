import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'app/models/user';
import { AccountService } from 'app/services/account.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  currentUser$: Observable<User>;

  public LoginForm = new FormGroup({
    username: new FormControl("", [Validators.required]),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(8),
    ]),
  });

  constructor(
    public accountService: AccountService,
    private route: Router,
    private toastr: ToastrService
  ) {}
  ngOnInit() {
    this.currentUser$ = this.accountService.currentUser$;
  }

  OnLogin(valid) {
    if (valid) {
      this.accountService.login(this.LoginForm.value).subscribe(
        (res) => {
          console.log(this.LoginForm.value);
          this.route.navigateByUrl("/dashboard");
        },
        (error) => {
          this.toastr.error(error.error);
        }
      );
    } else {
      this.toastr.error("Invalid form input!");
    }
  }
}
