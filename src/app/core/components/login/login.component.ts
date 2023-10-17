import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, of, tap } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!: FormGroup;
  loginLoading: boolean = false;

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
    this.loginLoading = true;
    this.authService.login(this.loginForm.value).pipe(
      tap(() => {
        this.loginLoading = false;
        this.router.navigateByUrl('/');
      }),
      catchError(() => {
        this.loginLoading = false;
        return of(false);
      })
    ).subscribe();
  }

    
  
}
