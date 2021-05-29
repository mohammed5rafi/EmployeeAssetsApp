import { Component, OnInit } from '@angular/core';
import { AccountService } from 'app/services/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  model: any = {};
  constructor(
    private accountService: AccountService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {}
  register() {
    this.accountService.register(this.model).subscribe(
      (res) => {
        console.log(res);
        this.toastr.success("Successfully Registerd ");
      },
      (error) => {
        console.log(error);
        this.toastr.error(error.error);
      }
    );
  }
}
