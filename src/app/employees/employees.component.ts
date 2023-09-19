import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
})
export class EmployeesComponent implements OnInit {
  employees: any[] = [];
  selectedRating: number[] = []; // Assuming it's an array for each employee

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Fetch employees from the API
    this.fetchEmployees();
  }
  isCheckmarkRed = false;

  toggleCheckmarkColor() {
    // Toggle the value of isCheckmarkRed to change the color
    this.isCheckmarkRed = !this.isCheckmarkRed;
  }
  rateEmployee(rating: number, userId: number) {
    // Find the employee by userId
    const employee = this.employees.find((emp) => emp.id_user === userId);

    if (employee) {
      // Update the selectedRating for the specific employee
      this.selectedRating[employee.id_user] = rating + 1;

      // Send the updated rating to the server
      this.http
        .post(`http://localhost:8094/employees/rate/${userId}/${rating}`, {})
        .subscribe((response) => {
          // Handle the response if needed
          console.log('Rating sent to the server:', response);
        });
    }
  }

  updateEmployeeStatus(userId: number) {
    const updatedStatus = this.employees.find(
      (employee) => employee.id_user === userId
    ).status;
    console.log(updatedStatus);
    this.http
      .post(`http://localhost:8094/employees/status/${userId}`, {
        statusEnum: updatedStatus,
      })
      .subscribe(
        (response: any) => {
          // Handle a successful update response if needed
          console.log('Status updated successfully:', response);
        },
        (error) => {
          // Handle errors, such as network issues or server errors
          console.error('Error updating status:', error);
        }
      );
  }
  fetchEmployees() {
    this.http.get('http://localhost:8094/employees').subscribe(
      (response: any) => {
        this.employees = response;
        this.employees.forEach((employee) => {
          this.selectedRating[employee.id_user] = employee.rate;
        });
      },
      (error) => {
        console.error('Error fetching employees:', error);
      }
    );
    console.log('selected Rating', this.selectedRating);
  }

  deleteEmployee(employeeId: number) {
    // Send a DELETE request to the API to delete the employee
    this.http.delete(`http://localhost:8094/employees/${employeeId}`).subscribe(
      (response: any) => {
        // Remove the deleted employee from the list
        this.employees = this.employees.filter(
          (employee) => employee.id !== employeeId
        );
      },
      (error) => {
        console.error('Error deleting employee:', error);
      }
    );
  }
}
