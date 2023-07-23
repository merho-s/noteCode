import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';



@NgModule({
  declarations: [
    UserManagementComponent,
    AdminPageComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AdminModule { }
