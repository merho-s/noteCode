import { Component } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { IUser } from 'src/app/core/models/user.interface';
import { AdminService } from 'src/app/core/services/admin.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent {
  waitingUsers$!: Observable<IUser[]>;

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.waitingUsers$ = this.adminService.getAllWaitingUsers();
  }

  onWhitelistWaitingUser(id: number) {
    this.adminService.whitelistWaitingUser(id).pipe(
      tap(() => this.waitingUsers$.subscribe())
    ).subscribe();
  }
}
