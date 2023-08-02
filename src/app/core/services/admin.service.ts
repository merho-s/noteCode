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
    return this.http.get<IUser[]>(`${environment.apiUrlAdmin}/waitingusers`);
  }

  whitelistWaitingUser(id: number) {
    return this.http.post<boolean>(`${environment.apiUrlAdmin}/whitelist/${id}`, null)
  }
}
