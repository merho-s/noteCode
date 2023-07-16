import {  ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { inject } from "@angular/core";
import { Observable } from "rxjs";

export const AuthGuard: CanActivateFn =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
        const authService: AuthService = inject(AuthService);
        const router: Router = inject(Router);
        authService.isAdmin();
        if(authService.isLogged()) {
            return true;
        } else {
            return router.navigate(['login']);
        }
    }
