import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const expectedRoles = route.data['expectedRoles']; // Use brackets

    if (
      !this.authService.isAuthenticatedUser() ||
      !this.authService.hasRole(expectedRoles)
    ) {
      // Redirect to unauthorized page or any other page
      this.router.navigate(['/unauthorized']);
      return false;
    }

    return true;
  }
}
