import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router, private authService: AuthService) {}

    canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree {
      const expectedRoles = route.data['roles'];

      if (!this.authService.isAuthenticated()) {
        this.router.navigate(['/login']);
        return false;
      }

      if (!expectedRoles || expectedRoles.length === 0) {
        return true;
      }

      const userRoles = this.authService.getUserRoles();
      const hasPermission = expectedRoles.some((role: string) => userRoles.includes(role));

      if (!hasPermission) {
        this.router.navigate(['/unauthorized']);
        return false;
      }

      return true;
    }
}
