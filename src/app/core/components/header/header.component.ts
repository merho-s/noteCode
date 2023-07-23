import { Component, OnChanges } from '@angular/core';
import { IUser } from '../../models/user.interface';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  user!: IUser;
  isLoggedIn$!: Observable<boolean>;
  isAdmin$!: Observable<boolean>;

  constructor(private authService: AuthService,
              private router: Router) {}

  ngOnInit() {
    this.isLoggedIn$ = this.authService.getIsLoggedInObservable();
    this.isAdmin$ = this.authService.getIsAdminObservable();
  }

  onLogout() {
    this.authService.logout().pipe(
      tap(() => {
        this.router.navigateByUrl('/login');
      })
    ).subscribe();
  }
}
