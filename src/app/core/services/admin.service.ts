import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IUser } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  getAllWaitingUsers() {
    return this.http.get<IUser[]>(`${environment.apiUrlUser}/waitingusers`);
  }

  whitelistWaitingUser(id: number | undefined) {
    return this.http.post<boolean>(`${environment.apiUrlUser}/whitelist/${id}`, null)
  }
}
