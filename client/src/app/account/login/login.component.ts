import { Component, OnInit } from '@angular/core';
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
  model: any = {};
  currentUser$: Observable<User>;
  constructor(
    public accountService: AccountService,
    private route: Router,
    private toastr: ToastrService
  ) {}
  ngOnInit() {
    this.currentUser$ = this.accountService.currentUser$;
  }

  login() {
    this.accountService.login(this.model).subscribe((res) => {
      this.route.navigateByUrl("/dashboard");
    });
  }
}
