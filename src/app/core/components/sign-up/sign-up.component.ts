import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { tap } from 'rxjs';
import { IAuthentication } from '../../models/authentication.interface';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  signUpForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private authService: AuthService,
              private userService: UserService) {}

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    })
  }

  onSubmitForm() {
    let user: IAuthentication = {
      username: this.signUpForm.value.username,
      password: this.signUpForm.value.password
    }
    this.userService.requestAccess(user).pipe(
      tap(() => this.router.navigateByUrl('/'))
    ).subscribe();
  }

}
