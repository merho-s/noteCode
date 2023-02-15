import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

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

        return this.http.post(environment.apiUrlUser, params, {headers, responseType: "text"}).pipe(
            tap((token) => localStorage.setItem("token", token)),
            tap(() => console.log(localStorage.getItem("token")))
        );
    }

    logout() : Observable<any> {
        return this.http.post(environment.apiUrlUser, null);
    } 
}