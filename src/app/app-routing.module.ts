import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/components/login/login.component';
import { AuthGuard } from './core/guards/auth.guard';
import { AdminGuard } from './core/guards/admin.guard';
import { HomeComponent } from './core/components/home/home.component';
import { SignUpComponent } from './core/components/sign-up/sign-up.component';
import { UserManagementComponent } from './admin/components/user-management/user-management.component';
import { UnauthorizedPageComponent } from './core/pages/unauthorized-page/unauthorized-page.component';
import { AdminPageComponent } from './admin/pages/admin-page/admin-page.component';
import { NotFoundPageComponent } from './core/pages/not-found-page/not-found-page.component';
import { WaitingAccessComponent } from './core/components/waiting-access/waiting-access.component';
import { WaitingAccessGuard } from './core/guards/waiting-access.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [WaitingAccessGuard] },
  { path: 'signup', component: SignUpComponent, canActivate: [WaitingAccessGuard] },
  { path: 'admin', component: AdminPageComponent, canActivate: [AdminGuard] },
  { path: 'unauthorized', component: UnauthorizedPageComponent },
  { path: 'waiting-access', component: WaitingAccessComponent },
  { path: 'notes', 
    loadChildren: () => import('./note-components/note-components.module').then(m => m.NoteComponentsModule), 
    canActivate: [AuthGuard] 
  },
  { path: '**', component: NotFoundPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})

export class AppRoutingModule { 

}
