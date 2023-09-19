import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-leaves',
  templateUrl: './leaves.component.html',
  styleUrls: ['./leaves.component.css'],
})
export class LeavesComponent implements OnInit {
  leaves: any[] = []; // Replace with your actual leave model
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Fetch the list of unchecked leaves from your API
    this.fetchUncheckedLeaves();
  }

  fetchUncheckedLeaves() {
    this.http
      .get('http://localhost:8094/leaves/unchecked')
      .subscribe((response: any) => {
        this.leaves = response;
      });
  }

  approveLeave(requestId: number) {
    // Send a request to approve the leave
    this.http
      .post('http://localhost:8094/leaves/approve/' + requestId, {})
      .subscribe((response: any) => {
        // Handle the response if needed
        // You may also want to remove the approved leave from the list
        window.location.reload();
      });
  }

  declineLeave(requestId: number) {
    // Send a request to decline the leave
    this.http
      .post('http://localhost:8094/leaves/decline/' + requestId, {})
      .subscribe(
        (response: any) => {
          // Handle the response if needed
          // You may also want to remove the declined leave from the list
          window.location.reload();
        },
        (err) => {}
      );
  }
}
