import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from 'fullcalendar';
import dayGridPlugin from '@fullcalendar/daygrid';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.css'],
})
export class MeetingComponent implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.initializeEvents();
  }

  initializeEvents() {
    this.http.get<any[]>('http://localhost:8094/events').subscribe(
      (response) => {
        this.meetings = response; // Assuming the API returns an array of events
        this.updateCalendarEvents(); // Call the function to update calendar events
      },
      (error) => {
        console.error('Error fetching events:', error);
        // Handle the error here if needed
      }
    );
  }

  meetings: any = [];
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    weekends: false,
    events: [], // Initialize events as an empty array
  };

  // Function to update calendar events based on meetings data
  updateCalendarEvents() {
    this.calendarOptions.events = this.meetings.map((meeting: any) => ({
      title: meeting.event_name,
      start: new Date(meeting.time),
    }));
  }
}
