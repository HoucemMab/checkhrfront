import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-request-training',
  templateUrl: './request-training.component.html',
  styleUrls: ['./request-training.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('300ms', style({ opacity: 0 }))]),
    ]),
  ],
})
export class RequestTrainingComponent {
  // Variables for form data and message
  courseName: string = '';
  maxHours: number | null = null;
  objective: string = '';
  specifications: string = '';
  message: string | null = null; // Initialize message as null

  constructor(private http: HttpClient) {}

  submitTrainingRequest() {
    // Implement your logic to handle the form submission here
    // You can send data to the server and display a message based on the response
    const userId = this.extractUserIdFromToken(); // Implement this method to extract userId
    const trainingRequest = {
      coursename: this.courseName,
      date: new Date(),
      numchapters: this.maxHours,
      coursesize: this.objective,
      specifications: this.specifications,
      user: {
        id_user: userId,
      },
    };

    this.http
      .post('http://localhost:8094/trainings/request', trainingRequest)
      .subscribe(
        (response: any) => {
          // Successful request, display a success message
          this.message = 'Training request submitted successfully!';
        },
        (error) => {
          // Handle errors here, and display an error message
          this.message = 'Error submitting training request. Please try again.';
        }
      );
  }

  // Method to extract userId from the token
  private extractUserIdFromToken(): number | null {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const decodedToken: any = jwt_decode(token);
        return decodedToken.userId ? +decodedToken.userId : null;
      }
      return null;
    } catch (error) {
      return null;
    }
  }
}
