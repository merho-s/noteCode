import { Component, OnChanges } from '@angular/core';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  user!: User;

  constructor(private router: Router,
              private authService: AuthService) {}

  onTitleClick() {
    this.router.navigateByUrl("/");
  }

  onLogout() {
    this.authService.logout();
  }
}
