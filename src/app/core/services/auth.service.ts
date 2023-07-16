import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, map, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenInfos } from '../models/token.model';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    isLoggedIn$ = new BehaviorSubject<boolean>(false); 
    
    constructor (private http: HttpClient,
                private router: Router) {}

    login(username: string, password: string) {

        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);

        return this.http.post<TokenInfos>(`${environment.apiUrlUser}/login`, formData).pipe(
            tap(response => {
                localStorage.setItem('token', response.token);
                localStorage.setItem('username', response.username);
                localStorage.setItem('expirationDate', response.expirationDate.toString());
                localStorage.setItem('role', response.role);
            })
        );
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('expirationDate');
        this.router.navigateByUrl('/');
        return this.http.post(`${environment.apiUrlUser}/signout`, null);
    } 

    isLogged(): boolean {
        const exp = localStorage.getItem('expirationDate');
        this.isLoggedIn$.pipe(tap((value) => console.log(value)));
        if(!exp) {
            this.isLoggedIn$.next(false);
           return false;
        } else {
            const result = Date.parse(exp) > Date.now();
            this.isLoggedIn$.next(result);
            return result;
        }
    }
}