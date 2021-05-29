import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: "app-assets-master",
  templateUrl: "./assets-master.component.html",
  styleUrls: ["./assets-master.component.css"],
})
export class AssetsMasterComponent implements OnInit {
  public page = 1;
  public itemsPerPage = 10;
  public maxSize = 5;
  public numPages = 1;
  public length = 0;

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}
  openDialog(i: any) {
    let identifier = null;
    if (i === 1) {
      identifier = {
        i: 1,
      };
    }
    if (i === 2) {
      identifier = {
        i: 2,
      };
    }

    const dialogRef = this.dialog.open(AssetsAdd, {
      width: "30vw",
      data: identifier,
      autoFocus: false,
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }
}

@Component({
  selector: "assets-add",
  templateUrl: "./assets-add.component.html",
  styleUrls: ["./assets-master.component.css"],
})
export class AssetsAdd implements OnInit {
  action: string;
  local_data: any;
  form: FormGroup;
  documentStatus: any;
  declaration: any;
  ensResponse: any;
  mrnId: any;
  submitInProgress: boolean = false;
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private dialogRef: MatDialogRef<AssetsAdd>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = fb.group({
      username: ["", [Validators.required]],
      password: ["", [Validators.required]],
    });
  }

  ngOnInit() {}
  // doAction(valid) {
  //   if (valid) {
  //     if (this.data.i === 1) {
  //       this.submitInProgress = true;
  //       this.summaryDeclarationService.LoginIcsNi(this.form.value).subscribe(
  //         (res) => {
  //           if (res != null) {
  //             this.declaration = res;
  //             this.documentStatus = this.declaration.ensDeclarationStatus;
  //             this.ensResponse = this.declaration.ensResponse;

  //             if(this.documentStatus=="Submitted" || this.documentStatus=="Waiting"){
  //               this.toastr.success(this.ensResponse);
  //             }else if(this.documentStatus=="Accepted"){
  //               this.toastr.success(this.ensResponse);
  //             }else if(this.documentStatus=="Error"){
  //               this.toastr.error(this.ensResponse);
  //             }else{
  //               this.toastr.error(this.ensResponse);
  //             }

  //             this.dialogRef.close(this.declaration);

  //             // if (this.ensResponse != null || this.ensResponse !== "") {
  //             //   this.toastr.warning(this.ensResponse);
  //             // } else if (
  //             //   this.ensResponse == null &&
  //             //   this.documentStatus === "Submitted"
  //             // ) {
  //             //   this.toastr.success("ENS submitted successfully.");
  //             // }

  //           }
  //           this.submitInProgress = false;
  //         },
  //         (error) => {
  //           this.toastr.error(
  //             this.getFormattedErrorMessage(
  //               error.status === 400
  //                 ? error.error.errors.DomainValidations
  //                 : null
  //             ),
  //             null,
  //             { enableHtml: true }
  //           );
  //           this.submitInProgress = false;
  //         }
  //       );
  //     }
  //     if (this.data.i === 2) {
  //       this.submitInProgress = true;

  //       this.summaryDeclarationService.LoginIcsNiMRN(this.form.value).subscribe(
  //         (res) => {
  //           if (res != null) {
  //             this.declaration = res;
  //             this.documentStatus = this.declaration.ensDeclarationStatus;
  //             this.ensResponse = this.declaration.ensResponse;

  //             if(this.documentStatus=="Submitted" || this.documentStatus=="Waiting"){
  //               this.toastr.success(this.ensResponse);
  //             }else if(this.documentStatus=="Accepted"){
  //               this.toastr.success(this.ensResponse);
  //             }else if(this.documentStatus=="Error"){
  //               this.toastr.error(this.ensResponse);
  //             }else{
  //               this.toastr.error(this.ensResponse);
  //             }

  //             // if (this.ensResponse != null || this.ensResponse !== "") {
  //             //   this.toastr.warning(this.ensResponse);
  //             // } else if (
  //             //   this.ensResponse == null &&
  //             //   this.documentStatus === "Submitted"
  //             // ) {
  //             //   this.toastr.success("MRN submitted successfully.");
  //             // }
  //             this.dialogRef.close(this.declaration);
  //           }
  //           this.submitInProgress = false;
  //         },
  //         (error) => {
  //           this.toastr.error(
  //             this.getFormattedErrorMessage(
  //               error.status === 400
  //                 ? error.error.errors.DomainValidations
  //                 : null
  //             ),
  //             null,
  //             { enableHtml: true }
  //           );
  //           this.submitInProgress = false;
  //         }
  //       );
  //     }
  //   }
  // }
  private getFormattedErrorMessage(errors: string[]): string {
    if (!!errors && errors.length > 0) {
      let message = "Following errors occured.";
      for (const error of errors) {
        message += "<br/>";
        message += error.replace("\n", "<br/>");
      }
      return message;
    }
    return "Unknown error occured. Please try again later.";
  }
  doCancel() {
    this.dialogRef.close();
  }
  closeDialog() {
    this.dialogRef.close();
  }
}
