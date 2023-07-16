import { HttpClient } from "@angular/common/http";
import { IUser } from "../models/user.interface";
import { environment } from "src/environments/environment";
import { Injectable } from "@angular/core";
import { CoreModule } from "../core.module";

// @Injectable({
//     providedIn: 'root'
// })
@Injectable()
export class UserService {

    constructor(private http: HttpClient) {}

    signUp(user: IUser) {
        return this.http.post<boolean>(`${environment.apiUrlUser}/signup`, user);
    }

    requestAccess(user: IUser) {
        return this.http.post<boolean>(`${environment.apiUrlUser}/requestaccess`, user);
    }

    getAllWaitingUsers() {
        return this.http.get<IUser[]>(`${environment.apiUrlUser}/waitingusers`);
    }

    whitelistWaitingUser(id: number) {
        return this.http.post<boolean>(`${environment.apiUrlUser}/whitelist/${id}`, null)
    }
    
    

}