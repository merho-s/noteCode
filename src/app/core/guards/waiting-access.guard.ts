import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, catchError, of, tap } from "rxjs";
import { UserService } from "../services/user.service";

export const WaitingAccessGuard: CanActivateFn =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
        const router: Router = inject(Router);
        const request = localStorage.getItem('requestAccess');
        if(request) {
            return router.navigate(['waiting-access']);
        } else return true;

    }