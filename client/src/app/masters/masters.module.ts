import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
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
