import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent }       from './home.component';
import {AuthGuard} from "../services/authGuard.service";

const homeRoutes: Routes = [
    { path: '', component: HomeComponent,
        canActivateChild: [AuthGuard],

      children: [
          {     path: 'users',
                loadChildren: 'app/users/users.module#UsersModule'
          },
          {
              path: 'roles',
              loadChildren: 'app/roles/roles.module#RolesModule'
          },
          {
              path:'changepassword',
              loadChildren:'app/changepassword/change-password.module#ChangePasswordModule'
          },
          {
              path:'reports',
              loadChildren:'app/reports/reports.module#ReportsModule'
          },
          {
              path:'UploadReport',
              loadChildren:'app/upload-report/upload-report.module#UploadReportModule'
          },
          {
              path: '',
              redirectTo: '/home/users/list'
          }

      ]  }
];

@NgModule({
    imports: [
        RouterModule.forChild(homeRoutes)
    ],
    exports: [
        RouterModule
    ],
    providers: [

    ]
})
export class HomeRoutingModule {}