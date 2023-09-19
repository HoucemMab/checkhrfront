import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  username: any = '';
  notificationCount = 0; // Initialize with 0
  showNotifications = false; // Initially, don't show notifications dropdown
  notifications: any[] = []; // Array to store notifications from API
  searchInput: string = ''; // Initialize search input value
  searchResults: any[] = []; // Array to store search results
  private apiUrl = 'http://localhost:8094/notifications/unread';
  showSearchResults: boolean = false;
  mouseOverDropdown: boolean = false;
  showUserDropdown = false;

  pages = [
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

  constructor(
    private http: HttpClient,
    private router: Router,
    private elementRef: ElementRef
  ) {}

  toggleUserDropdown() {
    this.showUserDropdown = !this.showUserDropdown;
    console.log(this.showUserDropdown);
  }

  logout() {
    // Implement your logout logic here, e.g., navigate to the logout page
    // Example: this.router.navigate(['/logout']);
    localStorage.removeItem('token');
    location.reload();
  }
  ngOnInit() {
    // Fetch the token from the authentication service
    const token = localStorage.getItem('token');

    if (token) {
      // Decode the token to get user information
      const decodedToken: any = jwt_decode(token);

      // Assuming your token contains a 'username' claim
      this.username = decodedToken.sub;
    }
    this.getNotifications();
  }
  onSearchInputFocus() {
    this.showSearchResults = true;
  }

  // Function to handle mouseover event on the search results dropdown
  onSearchResultsMouseOver() {
    this.mouseOverDropdown = true;
  }

  // Function to handle mouseout event on the search results dropdown
  onSearchResultsMouseOut() {
    this.mouseOverDropdown = false;
    // Hide the dropdown only if the mouse is not over it
    if (!this.mouseOverDropdown) {
      this.showSearchResults = false;
    }
  }

  // Function to toggle visibility of notifications dropdown
  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
  }

  getNotifications() {
    this.http.get<any[]>(this.apiUrl).subscribe((res) => {
      this.notifications = res;
      this.notificationCount = res.length;
    });
  }

  // Function to handle search input changes
  onSearchInputChange() {
    // Filter pages based on search input
    this.searchResults = this.pages.filter((page) =>
      page.title.toLowerCase().includes(this.searchInput.toLowerCase())
    );
    console.log(this.showSearchResults, this.searchResults);
  }

  // Function to navigate to a selected page from search results
  navigateToPage(url: string) {
    // Add your navigation logic here, e.g., route to the selected page
    console.log('navigating', url);
    this.router.navigate([url]);
  }
  preventClose(event: MouseEvent) {
    event.stopPropagation();
  }

  // Add this method to close the dropdown when clicking outside of it
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.showSearchResults = false;
    }
  }

  navigateToPageWithDelay(url: string) {
    this.navigateToPage(url);

    // Set a flag to delay closing the dropdown

    // Delay the closing of the dropdown for a short time (e.g., 200 milliseconds)
    setTimeout(() => {
      this.showSearchResults = true;
    }, 200);
  }
}
