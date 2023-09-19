import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
})
export class EventsComponent implements OnInit {
  // Define an array of fake events data (you can replace this with real data)
  events: any = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.initializeEvents();
  }
  initializeEvents() {
    this.http.get<any[]>('http://localhost:8094/events').subscribe(
      (response) => {
        this.events = response; // Assuming the API returns an array of events
      },
      (error) => {
        console.error('Error fetching events:', error);
        // Handle the error here if needed
      }
    );
  }
}
