import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  // User credentials
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  private isAuthenticated = false;

  constructor(private http: HttpClient, private router: Router) {}

  // Function to handle login
  // Function to handle login
  isValidEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    console.log(email);
    return emailPattern.test(email);
  }
  login() {
    // Prepare the login request payload
    if (this.isValidEmail(this.email)) {
      const loginPayload = {
        username: this.email,
        password: this.password,
      };

      // Send a POST request to the login endpoint
      this.http
        .post('http://localhost:8094/auth/login', loginPayload, {
          responseType: 'text',
        })
        .subscribe(
          (response: any) => {
            // Check if the response contains a valid token
            if (response) {
              // Successful login, store the token in localStorage
              localStorage.setItem('token', response);
              console.log('Login successful:', response);
              const decodedToken: any = jwt_decode(response);
              const userRole: string = decodedToken.role;
              console.log('User Role:', userRole);
              this.isAuthenticated = true;

              // Redirect to another page (e.g., dashboard) on successful login
              this.router.navigate(['/']);
            } else {
              // Handle authentication error here, e.g., display an error message to the user
              console.error('Authentication failed');
              // You can show an error message to the user here
            }
          },
          (error) => {
            // Handle login error here, e.g., display an error message to the user

            console.error('Login error:', error);
          }
        );
    } else {
      this.errorMessage = 'Invalid email format.';
      console.log('invalid email');
    }
  }
}
