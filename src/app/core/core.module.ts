import { NgModule } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { httpInterceptorProviders } from './interceptors';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './components/home/home.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { RouterModule } from '@angular/router';
import { UserService } from './services/user.service';


@NgModule({
  declarations: [
    HeaderComponent,
    LoginComponent,
    HomeComponent,
    SignUpComponent,
  ],
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule
  ],
  exports: [
    HeaderComponent
  ],
  providers: [
    httpInterceptorProviders,
    UserService
  ]
})
export class CoreModule { }
