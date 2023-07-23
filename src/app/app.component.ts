import { Component } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  isLoggedIn$!: Observable<boolean>;

  title = 'noteCode';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.isLoggedIn$ = this.authService.getIsLoggedInObservable();
    if(this.authService.isAdmin()) {
      this.authService.isLogged();
    }
  }

  
}
