import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-waiting-access',
  templateUrl: './waiting-access.component.html',
  styleUrls: ['./waiting-access.component.scss']
})
export class WaitingAccessComponent {
  isValid$!: Observable<boolean | null>;
  username!: string;

  constructor(private userService: UserService) {}

  ngOnInit() {
    const waitingUser = localStorage.getItem('requestAccess');
    this.username = waitingUser ? JSON.parse(waitingUser).username : null;
  }

  checkUserStatus() {
    this.isValid$ = this.userService.checkUserStatus();
  }
}

