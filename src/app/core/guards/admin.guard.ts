import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { inject } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";

export const AdminGuard: CanActivateFn =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
        const router: Router = inject(Router);
        const authService: AuthService = inject(AuthService);
        if(authService.isAdmin()) {
            return true;
        } else {
            return router.navigate(['/']);
        }
    }
