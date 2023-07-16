import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { inject } from "@angular/core";
import { Observable } from "rxjs";

export const AdminGuard: CanActivateFn =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
        const router: Router = inject(Router);
        if(localStorage.getItem('role') == 'Admin') {
            return true;
        } else {
            return router.navigate(['/']);
        }
    }
