import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-events',
  templateUrl: './admin-events.component.html',
  styleUrls: ['./admin-events.component.css'],
})
export class AdminEventsComponent {
  eventName: string = '';
  eventDate: string = '';
  eventObjective: string = '';
  eventContent: string = '';

  constructor(private http: HttpClient) {}

  submitEvent() {
    const eventData = {
      event_name: this.eventName,
      date: this.eventDate,
      content: this.eventContent,
      time: new Date().toISOString(), // Use the current date and time in ISO format
    };

    // Send a POST request to the API to create the event
    this.http.post('http://localhost:8094/events', eventData).subscribe(
      (response: any) => {
        // Handle success, e.g., show a success message
        console.log('Event created successfully:', response);
        window.location.reload();
      },
      (error) => {
        // Handle error, e.g., show an error message
        console.error('Error creating event:', error);
      }
    );
  }
}
