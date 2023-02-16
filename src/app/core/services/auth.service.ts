import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenInfos } from '../models/token.model';

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    
    constructor (private http: HttpClient) {
    }

    login(username: string, password: string) {
        // const options = {
        //     headers: new HttpHeaders({
        //     'Content-Type': 'multipart/form-data',
        // })
        // };
        
        // const params = new HttpParams()
        //     .set('username', username)
        //     .set('password', password);

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
}