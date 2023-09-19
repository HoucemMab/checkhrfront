import { Component, OnInit } from '@angular/core';
import jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  pages: any[] = [];
  ngOnInit(): void {
    const token: any = localStorage.getItem('token');
    const decodedToken: any = jwtDecode(token);
    console.log(decodedToken);
    if (decodedToken.role === 'EMPLOYEE') {
      this.pages = this.userpages;
    } else {
      this.pages = this.adminpages;
    }
  }
  userpages = [
    { title: 'Profile', iconClass: 'fas fa-user', url: '/employeprofile' },
    { title: 'Request Leave', iconClass: 'fas fa-bed', url: '/request-leave' },
    {
      title: 'Request Loan',
      iconClass: 'fas fa-money-bill-wave',
      url: '/requestloan',
    },
    { title: 'Notes', iconClass: 'fas fa-sticky-note', url: '/note' },
    { title: 'Events', iconClass: 'far fa-calendar-alt', url: '/events' },
    {
      title: 'Training',
      iconClass: 'fas fa-chalkboard-teacher',
      url: '/trainings',
    },
    { title: 'Documents', iconClass: 'far fa-file-alt', url: '/documents' },
  ];
  adminpages = [
    { title: 'Dashboard', iconClass: 'fas fa-home', url: '/dashboard' },

    { title: 'Leaves', iconClass: 'fas fa-bed', url: '/leaves' },
    {
      title: 'Employees',
      iconClass: 'fas fa-briefcase',
      url: '/dashboard',
    },
    {
      title: 'Loans',
      iconClass: 'fas fa-money-bill-wave',
      url: '/loans',
    },
    { title: 'Notes', iconClass: 'fas fa-sticky-note', url: '/note' },
    { title: 'Events', iconClass: 'far fa-calendar-alt', url: '/admin-event' },
    {
      title: 'Training',
      iconClass: 'fas fa-chalkboard-teacher',
      url: '/trainings',
    },
    { title: 'Documents', iconClass: 'far fa-file-alt', url: '/employee-list' },
  ];
}
