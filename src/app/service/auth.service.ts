import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  isAuthenticatedUser(): boolean {
    const token: any = localStorage.getItem('token');
    return token;
  }
  hasRole(role: string) {
    const token: any = localStorage.getItem('token');
    const decodedToken: any = jwtDecode(token);
    const decodedRole: string = decodedToken.role;
    return decodedRole === role;
  }
  logout() {
    localStorage.removeItem('token');
  }
}
