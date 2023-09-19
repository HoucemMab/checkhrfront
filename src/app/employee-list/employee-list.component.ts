import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  employees: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Fetch employees from the backend API
    this.fetchEmployees();
  }

  fetchEmployees() {
    // Make an HTTP GET request to the API endpoint
    this.http.get<any[]>('http://localhost:8094/employees').subscribe(
      (response: any[]) => {
        // Assign the fetched data to the employees array
        this.employees = response;
        
      },
      (error) => {
        // Handle errors if necessary
        console.error('Error fetching employees:', error);
      }
    );
  }
  redirect(id: string) {
    window.location.href = `/documents/${id}`;
  }
}
