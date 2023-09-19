import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Message, Stomp } from '@stomp/stompjs';
import { Observable } from 'rxjs';
import * as SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root',
})
export class EventwebsocketService {
  private stompClient: any;
  private apiUrl = 'http://localhost:8094/notifications/unread';
  constructor(private http: HttpClient) {}

  connect() {
    const socket = new SockJS('http://localhost:8094/ws');
    this.stompClient = Stomp.over(socket);

    this.stompClient.connect({}, this.onConnected.bind(this), (error: any) => {
      console.log('errorCallBack -> ' + error);
      setTimeout(() => this.connect(), 5000);
    });
  }
  private onConnected(frame: any) {
    console.log('Socket Connected: ' + frame);

    this.stompClient.subscribe('/topic/event-updates', (message: Message) => {
      this.handleNotification(JSON.parse(message.body));
    });
    this.stompClient.subscribe('/topic/note-updates', (message: Message) => {
      this.handleNotification(JSON.parse(message.body));
    });
    this.stompClient.subscribe('/topic/leaves-updates', (message: Message) => {
      this.handleNotification(JSON.parse(message.body));
    });
    this.stompClient.subscribe('/topic/loans-updates', (message: Message) => {
      this.handleNotification(JSON.parse(message.body));
    });
    this.stompClient.subscribe(
      '/topic/trainings-updates',
      (message: Message) => {
        this.handleNotification(JSON.parse(message.body));
      }
    );
  }
  private handleNotification(notification: any) {
    console.log('Consoling the notif ', notification);
    window.location.reload();
  }
}
