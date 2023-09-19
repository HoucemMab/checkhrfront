import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import jwt_decode from 'jwt-decode';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-request-loan',
  templateUrl: './request-loan.component.html',
  styleUrls: ['./request-loan.component.css'],
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
export class RequestLoanComponent {
  // Variables to store form data
  loanAmount: number;
  loanDate: string; // Change to string to match the date format in your API
  loanDescription: string;
  message: string | null = null; // Initialize message as null

  constructor(private http: HttpClient) {
    // Initialize form data if needed
    this.loanAmount = 0;
    this.loanDate = new Date().toISOString().slice(0, 10); // Convert Date to string in 'yyyy-MM-dd' format
    this.loanDescription = '';
  }

  // Function to submit the loan request
  submitLoanRequest() {
    // Extract the user ID from the token
    const token: any = localStorage.getItem('token'); // Assuming you've stored the token in localStorage
    const decodedToken: any = jwt_decode(token);

    // Extract the user ID from the decoded token
    const userId = decodedToken.userId;
    console.log(userId);
    // Prepare the loan request payload
    const loanRequest = {
      date: this.loanDate,
      amount: this.loanAmount,
      user: {
        id_user: Number(userId),
      },
      specification: this.loanDescription,
    };
    console.log(loanRequest);
    // Send a POST request to the loan request API
    this.http
      .post('http://localhost:8094/loans/request', loanRequest)
      .subscribe(
        (response: any) => {
          // Successful loan request, you can handle the response here if needed
          console.log('Loan request successful:', response);

          this.message = 'Loan request successful'; // Update the message
          this.clearForm();
        },
        (error) => {
          // Handle loan request error here, e.g., display an error message to the user
          console.error('Loan request error:', error);
          this.message = 'Loan request failed'; // Update the message
        }
      );
  }

  // Function to clear the form fields after submission
  clearForm() {
    this.loanAmount = 0;
    this.loanDate = new Date().toISOString().slice(0, 10);
    this.loanDescription = '';
  }
}
