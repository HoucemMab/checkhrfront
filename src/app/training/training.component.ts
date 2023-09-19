import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css'],
})
export class TrainingComponent implements OnInit {
  courses: any[] = []; // Initialize as an empty array

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.fetchCourses(); // Fetch courses when the component initializes
  }
  redirect() {
    this.router.navigate(['/request-training']);
  }

  fetchCourses() {
    const apiUrl = 'http://localhost:8094/trainings';

    this.http.get<any[]>(apiUrl).subscribe(
      (data) => {
        this.courses = data;
      },
      (error) => {
        console.error('Error fetching courses:', error);
      }
    );
  }
}
