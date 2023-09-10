import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IUser } from '../models/user.interface';
import { Observable, Subject, tap } from 'rxjs';
import { Note } from '../models/note.interface';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private waitingUsers$ = new Subject<IUser[]>;

  constructor(private http: HttpClient) { }

  get waitingUsersObs$() {
    return this.waitingUsers$ as Observable<IUser[]>;
  }

  getAllNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(`${environment.apiUrl}/admin/notes`)
  }

  getAllWaitingUsers() {
    this.http.get<IUser[]>(`${environment.apiUrl}/admin/waitingusers`).pipe(
      tap(users => this.waitingUsers$.next(users))
    ).subscribe();
  }

  whitelistWaitingUser(id: number) {
    this.http.post<boolean>(`${environment.apiUrl}/admin/whitelist/${id}`, null).pipe(
      tap(() => this.getAllWaitingUsers())
    ).subscribe();
  }

  deleteUser(id: number) {
    this.http.delete<boolean>(`${environment.apiUrl}/admin/user/${id}`).pipe(
      tap(() => this.getAllWaitingUsers())
    ).subscribe();
  }
}
