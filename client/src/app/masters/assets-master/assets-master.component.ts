import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MasterService } from 'app/services/master.service';
import { ValidationService } from 'app/services/validation/validation.service';
import { EmployeeAssetsGlobalvariables } from 'app/shared/employee-Assets.modal';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

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
          this.length = res.length;
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
  onChangeTable(event) {
    this.page = event.page;
    this.itemsPerPage = event.itemsPerPage;

    this.getMasterAssets();
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
      width: "50vw",
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
  filteredOptions: Observable<string[]>;
  submitInProgress: boolean = false;
  constructor(
    private fb: FormBuilder,
    private masterService: MasterService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private _globalEmployeeAssets: EmployeeAssetsGlobalvariables,
    private dialogRef: MatDialogRef<AssetsAdd>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = fb.group({
      AssetName: ["", [Validators.required]],
      PhotoUrl: ["", [Validators.required]],
      PurchaseDate: ["", [Validators.required]],
      Category: "",
      CategoryCode: ["", [Validators.required]],
      PurchaseAmount: [
        "",
        [Validators.required, ValidationService.decimalValidation],
      ],
    });
  }

  async ngOnInit() {
    await this.getAssetCategory();
  }

  // doAction(valid) {
  //   if (valid) {
  //     if (this.data.editChecker) {
  //         this.updateGoodItems(this.form.value);
  //     } else {
  //       if (result.length == 0) {

  //           this.addGoodItems(this.form.value);
  //       } else {
  //         this.toastr.error(
  //           this.form.value.productDescription + " already added."
  //         );
  //       }

  //     }
  //   }

  // }

  addGoodItems(addObj) {
    this.masterService.saveAssetsItemsDetails(addObj).subscribe(
      (res) => {
        this.dialogRef.close({ data: { IsSaved: true } });
        if (res.status === 200 && this.data.formFlag) {
        }
        this.toastr.success("Assets details added successfully.");
      },
      (error) => {
        this.toastr.error(
          "There was a problem adding Assets details. Please try again."
        );
        this.dialogRef.close({ data: { IsSaved: true } });
      }
    );
  }
  updateGoodItems(addObj) {
    this.masterService.updateAssetItemsDetails(addObj).subscribe(
      (res) => {
        this.toastr.success("Assets details updated successfully.");
        this.dialogRef.close();
      },
      (error) => {
        this.toastr.error(
          "There was a problem updating Assets details. Please try again."
        );
        this.dialogRef.close();
      }
    );
  }
  async getAssetCategory() {
    await this.masterService.getAssetsCategory().subscribe(
      (res) => {
        this.filteredOptions = res;
      },
      (error) => {
        this.toastr.error(error.error);
      }
    );
  }
  _filter(value: number) {
    this.filteredOptions = this._globalEmployeeAssets.sortCategoryCodes(
      this._globalEmployeeAssets.MasterCategory
    );
    const filterValue = value.toString().toLowerCase();
    if (filterValue == null) {
      this.filteredOptions = this.filteredOptions;
    } else {
      this.filteredOptions = this._globalEmployeeAssets.filterCategoryCodes(
        this.filteredOptions,
        filterValue
      );
    }
  }
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
