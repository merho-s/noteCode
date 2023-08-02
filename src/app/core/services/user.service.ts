import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Injectable } from "@angular/core";
import { IAuthentication } from "../models/authentication.interface";

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
        return this.http.post<boolean>(`${environment.apiUrlUser}/requestaccess`, user);
    }

}