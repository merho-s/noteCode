import { NgModule } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { httpInterceptorProviders } from './interceptors';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './components/home/home.component';




@NgModule({
  declarations: [
    HeaderComponent,
    LoginComponent,
    HomeComponent,
  ],
  imports: [
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
