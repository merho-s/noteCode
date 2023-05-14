import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login-material',
  templateUrl: './login-material.component.html',
  styleUrls: ['./login-material.component.scss']
})
export class LoginMaterialComponent {

  loginForm!: FormGroup;
  token!: string;


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
    this.authService.login(this.loginForm.value.username, this.loginForm.value.password).pipe(
      // tap(() => this.router.navigateByUrl('notes'))
    ).subscribe();
  }
}
