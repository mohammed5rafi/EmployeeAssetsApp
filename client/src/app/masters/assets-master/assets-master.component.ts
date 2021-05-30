import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MasterService } from 'app/services/master.service';
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
  public AssetsItemList = [];
  constructor(
    private toastr: ToastrService,
    private masterService: MasterService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  async ngOnInit() {
    await this.getMasterAssets();
  }

  async getMasterAssets() {
    await this.masterService.getMasterAssetsList().subscribe(
      (res) => {
        if (res != null) {
          this.AssetsItemList = res;
          console.log(res);
        }
      },
      (error) => {
        if (error.status !== 404) {
          this.toastr.error(
            "There was a problem fetching Documents details. Please try again."
          );
        }
      }
    );
  }

  openDeleteAssets(id): void {
    const dialogRef = this.dialog.open(DeleteAssets);
    dialogRef.afterClosed().subscribe((result) => {
      if (result != null) {
        if (result.data.IsDeleted) {
          this.DeleteAssetsdetails(id);
        }
      }
    });
  }
  openDialog(i: any) {
    let assetsdata = null;
    if (i === -1) {
      assetsdata = {
        // formFlag: this.formFlag,
        editChecker: false,
        // AccontPriceList: this._globalShipment.AccountPriceList,
        // GoodItemsList: this.GoodItemsList,
      };
    } else {
      assetsdata = {
        id: this.AssetsItemList[i].id,
        // commodityCode: this.AssetsItemList[i].commodityCode,
        // countryOfOrigin: this.GoodItemsList[i].countryOfOrigin,
        editChecker: true,
      };
    }
    const dialogRef = this.dialog.open(AssetsAdd, {
      width: "30vw",
      data: assetsdata,
      autoFocus: false,
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }

  async DeleteAssetsdetails(Id) {
    await this.masterService
      .deleteAssetsItemsDetails(Id)
      .toPromise()
      .then(
        (res) => {
          if (res.status == 200) {
            // this._globalShipment.formsCompletdCount = this._globalShipment.formsCompletdCount - 1;
            // this._globalShipment.goodsFormsCompletedCount =
            //   this._globalShipment.goodsFormsCompletedCount - 1;
            // this.shipmentjobservice
            //   .getShipmentFormCount(
            //     this._globalShipment.ShipmentId,
            //     this._globalShipment.formsCompletdCount, this._globalShipment.goodsFormsCompletedCount, 'goodssection'
            //   ).subscribe(res => {
            //     this._globalShipment.calculatePercentage();
            //     console.log(res, "success");
            //   });
          }

          this.getMasterAssets();
        },
        (error) => {
          console.log(error);
        }
      );
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

@Component({
  selector: "delete-assets",
  templateUrl: "./assets-delete.html",
})
export class DeleteAssets {
  constructor(
    public dialogRef: MatDialogRef<DeleteAssets>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  doAction() {
    this.dialogRef.close({ data: { IsDeleted: true } });
  }

  closeDialog() {
    this.dialogRef.close({ data: { IsDeleted: false } });
  }
}
