import { Routes } from '@angular/router';
import { AssetsMasterComponent } from 'app/masters/assets-master/assets-master.component';
import { EmployeeMasterComponent } from 'app/masters/employee-master/employee-master.component';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';

export const AdminLayoutRoutes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  { path: "user-profile", component: UserProfileComponent },
  { path: "assets", component: AssetsMasterComponent },
  { path: "employee", component: EmployeeMasterComponent },
];
