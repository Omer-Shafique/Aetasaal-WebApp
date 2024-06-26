import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private userService: UserService) { }
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (this.userService.hasUserLoggedIn()) {
            return true;
        } else {
            this.userService.logoutUser();
            this.router.navigate(['/sign-in']);
            return false;
        }
    }
}
