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
  hasRole(role: any) {
    const token: any = localStorage.getItem('token');
    const decodedToken: any = jwtDecode(token);
    const decodedRole: string = decodedToken.role;
    console.log('role', decodedRole, 'must be ', role);
    return role.includes(decodedRole);
  }
  logout() {
    localStorage.removeItem('token');
  }
}
