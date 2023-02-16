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

    login(username: string, password: string) {
        const options = {
            headers: new HttpHeaders({
            'Content-Type': 'multipart/form-data',
        })
        };
        
        const params = new HttpParams()
            .set('username', username)
            .set('password', password);

        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);

        return this.http.post(`https://localhost:7287/api/v1/user/login`, formData);
    }

    logout() : Observable<any> {
        return this.http.post(environment.apiUrlUser, null);
    } 
}