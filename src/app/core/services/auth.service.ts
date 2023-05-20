import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenInfos } from '../models/token.model';

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    isLoggedIn$!: BehaviorSubject<boolean>; 
    isLoggedIn!: boolean;
    
    constructor (private http: HttpClient) {
    }

    login(username: string, password: string) {

        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);

        return this.http.post<TokenInfos>(`${environment.apiUrlUser}/login`, formData).pipe(
            tap(response => {
                localStorage.setItem('token', response.token),
                localStorage.setItem('username', response.username),
                localStorage.setItem('expirationDate', response.expirationDate.toString())
            })
        );
    }

    logout() {
        return this.http.post(environment.apiUrlUser, null);
    } 

    isLogged(): boolean {
        const exp = localStorage.getItem('expirationDate');
        if(exp !== null) {
            const res = Date.parse(exp) > Date.now();
            // this.isLoggedIn$.next(res);
            // this.isLoggedIn = res;
            return res;
        }else {
            // this.isLoggedIn$.next(false);
            // this.isLoggedIn = false;
            return false;
        }
    }
}