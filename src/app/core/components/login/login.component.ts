import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NonNullAssert } from '@angular/compiler';
import { tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private authService: AuthService) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    })
  }

  onSubmitForm() {
    this.authService.login(this.loginForm.value).pipe(
      tap(() => {
        this.router.navigateByUrl('/notes');
      })
    ).subscribe();
  }

    
  
}
