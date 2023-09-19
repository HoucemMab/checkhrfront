import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-request-leave',
  templateUrl: './request-leave.component.html',
  styleUrls: ['./request-leave.component.css'],
})
export class RequestLeaveComponent implements OnInit {
  time: any = '';
  date: any = '';
  specifications: any = '';
  message: string = '';
  ngOnInit(): void {}
  constructor(private http: HttpClient) {}
  onSubmit() {
    const token: any = localStorage.getItem('token');
    const decodedToken: any = jwt_decode(token);
    const request: any = {
      time: this.time,
      date: this.date,
      specifications: this.specifications,
      user: {
        id_user: decodedToken.userId,
      },
    };
    this.http.post('http://localhost:8094/leaves/request', request).subscribe(
      (res) => {
        console.log(res);
        // window.location.reload();
        this.message = 'Request has been submitted';
      },
      (err) => {
        console.log(err);
        this.message = 'Something happened , please try again !';
      }
    );
  }
}
