import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
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
  emailCtrl!: FormControl;
  usernameCtrl!: FormControl;
  passwordCtrl!: FormControl;
  confirmPasswordCtrl!: FormControl;
  displayPasswordError!: boolean;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private userService: UserService) {}

  ngOnInit(): void {
    this.emailCtrl = this.formBuilder.control('', [Validators.required, Validators.email]);
    this.usernameCtrl = this.formBuilder.control('', Validators.required);
    this.passwordCtrl = this.formBuilder.control('', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[0-9])(?=.*[#$^+=!*()@%&.]).{8,}$')]);
    this.confirmPasswordCtrl = this.formBuilder.control('', [Validators.required, this.sameValidator(this.passwordCtrl)]);
    this.signUpForm = this.formBuilder.group({
      email: this.emailCtrl,
      username: this.usernameCtrl,
      password: this.passwordCtrl,
      confirmPassword: this.confirmPasswordCtrl
    })
  }

  sameValidator(ctrl: AbstractControl): ValidatorFn {
    return (controlToCompare: AbstractControl): ValidationErrors | null => {
      if(!controlToCompare.value) {
        return null;
      }
      if(controlToCompare.value !== ctrl.value) {
        return {same:true};
      } else return null;
    }
  }

  displayInputError(displayError: boolean) {
    displayError = true;
    console.log(this.displayPasswordError);
  }

  onSubmitForm() {
    let user: IAuthentication = {
      username: this.signUpForm.value.username,
      password: this.signUpForm.value.password,
      email: this.signUpForm.value.email
    }
    this.userService.requestAccess(user).pipe(
      tap(() => this.router.navigateByUrl('/'))
    ).subscribe();
  }

}
