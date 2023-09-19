import { Component, OnInit } from '@angular/core';
import { AuthService } from './service/auth.service';
import { EventwebsocketService } from './service/eventwebsocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    public authService: AuthService,
    private websocketService: EventwebsocketService
  ) {} // Inject AuthService here

  ngOnInit(): void {
    this.websocketService.connect();
  }

  title = 'checkhrfront';
}
