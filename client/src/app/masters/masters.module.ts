import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from 'app/shared/shared.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { NgxPaginationModule } from 'ngx-pagination';

import { AssetsAdd, AssetsMasterComponent, DeleteAssets } from './assets-master/assets-master.component';
import { EmployeeMasterComponent } from './employee-master/employee-master.component';
import { MastersRoutingModule } from './masters-routing.module';

@NgModule({
  declarations: [
    AssetsMasterComponent,
    EmployeeMasterComponent,
    AssetsAdd,
    DeleteAssets,
  ],
  imports: [
    CommonModule,
    MastersRoutingModule,
    MatDialogModule,
    MatIconModule,
    MatDatepickerModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatAutocompleteModule,
    MatNativeDateModule,
    SharedModule,
    PaginationModule.forRoot(),
    NgxPaginationModule,
  ],
  exports: [
    AssetsMasterComponent,
    EmployeeMasterComponent,
    AssetsAdd,
    DeleteAssets,
  ],
  entryComponents: [AssetsAdd, DeleteAssets],
})
export class MastersModule {}
