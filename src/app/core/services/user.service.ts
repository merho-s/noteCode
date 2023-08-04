import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Injectable } from "@angular/core";
import { IAuthentication } from "../models/authentication.interface";
import { Observable, catchError, of, tap } from "rxjs";
import { IUser } from "../models/user.interface";

// @Injectable({
//     providedIn: 'root'
// })
@Injectable()
export class UserService {
    constructor(private http: HttpClient) {}

    signUp(user: IAuthentication) {
        return this.http.post<boolean>(`${environment.apiUrlUser}/signup`, user);
    }

    requestAccess(user: IAuthentication) {
        return this.http.post<IUser>(`${environment.apiUrlUser}/requestaccess`, user).pipe(
            tap(res => {
                if(res)
                    localStorage.setItem('requestAccess', JSON.stringify(res));
            })
        );
    }

    checkUserStatus() {
        let waitingUser = localStorage.getItem('requestAccess');
        if(waitingUser) {
            return this.http.get<boolean>(`${environment.apiUrlUser}/userstatus?userId=${JSON.parse(waitingUser).id}`).pipe(
                tap(res => {
                    if(res)
                        localStorage.removeItem('requestAccess');
                })
            );
        }
        return of(true);
    }

}