import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, map, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenInfos } from '../models/token.model';
import { Router } from '@angular/router';
import { IAuthentication } from '../models/authentication.interface';

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    private isLoggedIn$ = new BehaviorSubject<boolean>(false); 
    private isAdmin$ = new BehaviorSubject<boolean>(false);
    
    constructor (private http: HttpClient,
                private router: Router) {}

    login(auth: IAuthentication) {
        return this.http.post<TokenInfos>(`${environment.apiUrl}/user/login`, auth).pipe(
            tap(response => {
                localStorage.setItem('token', response.token);
                localStorage.setItem('username', response.username);
                localStorage.setItem('expirationDate', response.expirationDate.toString());
                localStorage.setItem('role', response.role);
                this.isAdmin();
            })
        );
    }

    logout() {
        return this.http.post<boolean>(`${environment.apiUrl}/user/signout`, null).pipe(
            tap(() => {
                localStorage.removeItem('token');
                localStorage.removeItem('username');
                localStorage.removeItem('expirationDate');
                localStorage.removeItem('role');
                this.isLogged();
            })
        );
    } 

    isLogged(): boolean {
        const expirationDate = localStorage.getItem('expirationDate');
        if(!expirationDate) {
            this.isLoggedIn$.next(false);
            return false;
        } else {
            const result = Date.parse(expirationDate) > Date.now();
            this.isLoggedIn$.next(result);
            return result;
        }
    }

    isAdmin(): boolean {
        if(localStorage.getItem('role') === 'Admin') {
            this.isAdmin$.next(true);
            return true;
        } else {
            this.isAdmin$.next(false);
            return false;
        }
    }

    getIsLoggedInObservable() {
        return this.isLoggedIn$.asObservable();
    }

    getIsAdminObservable() {
        return this.isAdmin$.asObservable();
    }
}