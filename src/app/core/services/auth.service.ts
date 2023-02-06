import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    private token!: string;

    constructor (private http: HttpClient) {}

    login(user: {username: string, password: string}) : Observable<string> {
        return this.http.post<string>('https://localhost:7287/api/v1/login', user).pipe(
            tap(token => this.token = token),
            tap(() => console.log(this.token))
        );
    }
}