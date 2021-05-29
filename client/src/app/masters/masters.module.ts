import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from 'app/shared/shared.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { NgxPaginationModule } from 'ngx-pagination';

import { AssetsAdd, AssetsMasterComponent } from './assets-master/assets-master.component';
import { EmployeeMasterComponent } from './employee-master/employee-master.component';
import { MastersRoutingModule } from './masters-routing.module';

@NgModule({
  declarations: [AssetsMasterComponent, EmployeeMasterComponent, AssetsAdd],
  imports: [
    CommonModule,
    MastersRoutingModule,
    MatDialogModule,
    SharedModule,
    PaginationModule.forRoot(),
    NgxPaginationModule,
  ],
  exports: [AssetsMasterComponent, EmployeeMasterComponent, AssetsAdd],
  entryComponents: [AssetsAdd],
})
export class MastersModule {}
