import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/components/login/login.component';
import { AuthGuard } from './core/guards/auth.guard';
import { AdminGuard } from './core/guards/admin.guard';
import { HomeComponent } from './core/components/home/home.component';
import { SignUpComponent } from './core/components/sign-up/sign-up.component';
import { UserManagementComponent } from './admin/components/user-management/user-management.component';
import { UnauthorizedPageComponent } from './core/pages/unauthorized-page/unauthorized-page.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'user-management', component: UserManagementComponent, canActivate: [AdminGuard] },
  { path: 'unauthorized', component: UnauthorizedPageComponent },
  { path: 'notes', 
    loadChildren: () => import('./note-components/note-components.module').then(m => m.NoteComponentsModule), 
    canActivate: [AuthGuard] 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})

export class AppRoutingModule { 

}
