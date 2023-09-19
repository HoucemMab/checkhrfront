import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
})
export class AddEmployeeComponent {
  employee: any = {
    username: '',
    password: '',
    role: 'EMPLOYEE',
    birthdate: '',
    age: 0,
    phonenumber: 0,
    education: '',
    address: '',
    fullName: '',
  };

  constructor(private http: HttpClient) {}
  manage() {
    window.location.href = 'http://localhost:4200/employees';
  }
  addEmployee() {
    // Send a POST request to add a new employee
    console.log(this.employee);
    this.http
      .post('http://localhost:8094/auth/addUser', this.employee)
      .subscribe(
        (response: any) => {
          // Handle a successful employee addition
          console.log('Employee added successfully:', response);
          // You can perform further actions like redirection or displaying a success message
          window.location.reload();
        },
        (error) => {
          // Handle errors, such as validation errors or server issues
          console.log('Error adding employee:', error);
          // You can display an error message to the user
        }
      );
  }
}
