import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/core/models/user.interface';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent {
  waitingUsers$!: Observable<IUser[]>;

  constructor(private userService: UserService) {

  }

  ngOnInit() {
    console.log("test admin");
    this.waitingUsers$ = this.userService.getAllWaitingUsers();
  }

  onWhitelistWaitingUser(id: number) {
    this.userService.whitelistWaitingUser(id).subscribe();
  }
}
