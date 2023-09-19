import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.css'],
})
export class LoanComponent implements OnInit {
  constructor(private http: HttpClient) {}
  loans: any = [];
  ngOnInit(): void {
    this.fetchLoans();
  }
  fetchLoans() {
    this.http.get('http://localhost:8094/loans/unchecked').subscribe(
      (res) => {
        console.log(res);
        this.loans = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  approveLoan(id: String) {
    this.http.post(`http://localhost:8094/loans/approve/${id}`, {}).subscribe(
      (res) => {
        console.log(res);
        window.location.reload();
      },
      (err) => {
        console.log(err);
      }
    );
  }
  declineLoan(id: String) {
    this.http.post(`http://localhost:8094/loans/decline/${id}`, {}).subscribe(
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
