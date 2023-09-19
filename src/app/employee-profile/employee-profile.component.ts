import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import jwt_decode from 'jwt-decode';
@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.css'],
})
export class EmployeeProfileComponent implements OnInit {
  userId: any = ''; // Store the user ID
  userData: any = {}; // Store user data fetched from the backend
  updateSuccess: boolean = false;
  updateError: boolean = false;
  updateMessage: string = '';

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    // Extract user ID from the token
    this.userId = this.extractUserIdFromToken();

    // Fetch user data from the backend using the user ID
    this.fetchUserData();
  }

  private extractUserIdFromToken() {
    // Implement logic to extract the user ID from the token
    // You can use a library like jwt-decode to decode the token
    // and extract the user ID field.
    const token: any = localStorage.getItem('token');
    const decodedToken: any = jwt_decode(token);
    return decodedToken.userId;
  }
  saveUserData(): void {
    this.http.patch(`http://localhost:8094/employees`, this.userData).subscribe(
      () => {
        console.log('User data updated successfully.');
        this.updateSuccess = true; // Set to true for success
        this.updateError = false; // Set to false for success
        this.updateMessage = 'Profile updated successfully'; // Set the success message
        window.location.reload();
      },
      (error) => {
        this.updateSuccess = false; // Set to true for success
        this.updateError = true; // Set to false for success
        this.updateMessage = 'Cannot update profile ! '; // Set the success message

        console.error('Error updating user data', error);
      }
    );
    console.log(this.updateSuccess, this.updateMessage);
  }

  private fetchUserData(): void {
    // Make an HTTP request to fetch user data
    this.http.get(`http://localhost:8094/employees/${this.userId}`).subscribe(
      (data: any) => {
        this.userData = data;
        console.log(data);
      },
      (error) => {
        console.error('Error fetching user data', error);
      }
    );
  }
}
