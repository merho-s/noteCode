import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    token!: string;
    

    constructor (private http: HttpClient) {
    }

    login(username: string, password: string) : Observable<string> {
        const headers = new HttpHeaders({
            'Content-Type': 'multipart/form-data',
        });
        
        const params = new HttpParams()
            .set('username', username)
            .set('password', password);

        return this.http.post('https://localhost:7287/api/v1/login/', params, {headers, responseType: "text"}).pipe(
            tap((token) => localStorage.setItem("token", token)),
            tap(() => console.log(localStorage.getItem("token")))
        );
    }
}