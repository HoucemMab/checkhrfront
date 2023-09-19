import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-traingins-list',
  templateUrl: './traingins-list.component.html',
  styleUrls: ['./traingins-list.component.css'],
})
export class TrainginsListComponent implements OnInit {
  constructor(private http: HttpClient) {}
  training: any = [];
  ngOnInit(): void {
    this.fetchTrainingRequests();
  }
  fetchTrainingRequests() {
    this.http.get('http://localhost:8094/trainings/unchecked').subscribe(
      (res) => {
        console.log(res);
        this.training = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  approveRequest(id: string) {
    this.http
      .post(`http://localhost:8094/trainings/approve/${id}`, {})
      .subscribe(
        (res) => {
          console.log(res);
          window.location.reload();
        },
        (err) => {
          console.log(err);
        }
      );
  }
  declineRequest(id: string) {
    this.http
      .post(`http://localhost:8094/trainings/decline/${id}`, {})
      .subscribe(
        (res) => {
          console.log(res);
          window.location.reload();
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
