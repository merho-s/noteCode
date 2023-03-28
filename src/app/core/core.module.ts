import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { httpInterceptorProviders } from './interceptors';
import { SharedModule } from '../shared/shared.module';




@NgModule({
  declarations: [
    HeaderComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [
    HeaderComponent
  ],
  providers: [
    httpInterceptorProviders
  ]
})
export class CoreModule { }
