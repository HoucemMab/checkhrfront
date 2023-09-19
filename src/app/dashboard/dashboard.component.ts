// dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  totalEmployees: number = 0;
  totalLoans: number = 0;
  training: number = 0;
  events: number = 0;
  notes: number = 0;
  leaves: number = 0;
  // Initialize similar variables for other boxes
  employees: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Fetch data for the Total Employees box
    this.http
      .get<number>('http://localhost:8094/employees')
      .subscribe((data: any) => {
        this.totalEmployees = data.length;
      });

    // Fetch data for the Total Loans Given box
    this.http
      .get<number>('http://localhost:8094/loans')
      .subscribe((data: any) => {
        this.totalLoans = data.length;
      });

    this.http
      .get<number>('http://localhost:8094/trainings')
      .subscribe((data: any) => {
        this.training = data.length;
      });
    this.http
      .get<number>('http://localhost:8094/events')
      .subscribe((data: any) => {
        this.events = data.length;
      });
    this.http
      .get<number>('http://localhost:8094/notes')
      .subscribe((data: any) => {
        this.notes = data.length;
      });
    this.http
      .get<number>('http://localhost:8094/leaves')
      .subscribe((data: any) => {
        this.leaves = data.length;
      });
    // Fetch data for the Active Employees table
    this.http
      .get<any[]>('http://localhost:8094/employees')
      .subscribe((data) => {
        // Filter data for active employees (you might need a different API endpoint)
        this.employees = data;
      });

    // Repeat similar requests for other boxes
  }
}
