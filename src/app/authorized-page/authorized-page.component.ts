import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-authorized-page',
  templateUrl: './authorized-page.component.html',
  styleUrls: ['./authorized-page.component.css'],
})
export class AuthorizedPageComponent {
  constructor(private authService: AuthService) {}
}
