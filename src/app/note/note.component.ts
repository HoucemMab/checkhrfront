import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css'],
})
export class NoteComponent implements OnInit {
  newNote: string = ''; // Input for new note
  notes: any[] = []; // Array to store previous notes
  notificationMessage: string | null = null;

  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.initializeNotes();
  }
  formatDateString(dateString: string): string {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      timeZoneName: 'short',
    };
    const date = new Date(dateString);
    return date.toUTCString();
  }

  // Function to add a new note to the notes array
  addNote() {
    if (this.newNote.trim() !== '') {
      const token: any = localStorage.getItem('token');
      const decodedToken: any = jwt_decode(token);
      const newNote = {
        content: this.newNote,
        time: new Date(),
        user: {
          id_user: decodedToken.userId,
        },
      };

      this.http.post('http://localhost:8094/notes', newNote).subscribe(
        (response) => {
          console.log('Note sent successfully:', response);
          this.notificationMessage = 'Note added successfully.';
          // You can adjust the message and styling as needed
          setTimeout(() => {
            this.notificationMessage = null; // Clear the message after a delay (e.g., 3 seconds)
          }, 3000); // Adjust the delay as needed (3 seconds in this example)
          // Reset the input field
          this.newNote = '';
          window.location.reload();
        },
        (error) => {
          console.error('Error sending note:', error);
          this.notificationMessage = 'Error adding note. Please try again.';
        }
      );
    }
  }
  initializeNotes() {
    this.http.get<any[]>('http://localhost:8094/notes').subscribe(
      (response) => {
        this.notes = response; // Assuming the API returns an array of notes
        console.log(this.notes);
      },
      (error) => {
        console.error('Error fetching notes:', error);
        // Handle the error here if needed
      }
    );
  }
}
