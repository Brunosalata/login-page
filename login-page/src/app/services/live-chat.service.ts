import { Injectable } from '@angular/core';
import { Client, IMessage, StompSubscription } from '@stomp/stompjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private stompClient!: Client;
  private chatMessagesSubject = new BehaviorSubject<string[]>([]);
  chatMessages$ = this.chatMessagesSubject.asObservable();

  private messages: string[] = [];

  connect(): void {
    this.stompClient = new Client({
      brokerURL: `ws://${window.location.host}/ws/live-chat`,
      reconnectDelay: 5000
    });

    this.stompClient.onConnect = (frame) => {
      console.log('Connected:', frame);
      this.stompClient.subscribe('/topics/live-chat', (message: IMessage) => {
        const content = JSON.parse(message.body).content;
        this.messages.push(content);
        this.chatMessagesSubject.next([...this.messages]);
      });
    };

    this.stompClient.onWebSocketError = (error) => {
      console.error('WebSocket Error:', error);
    };

    this.stompClient.onStompError = (frame) => {
      console.error('STOMP Error:', frame.headers['message']);
      console.error('Details:', frame.body);
    };

    this.stompClient.activate();
  }

  disconnect(): void {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.deactivate();
      this.messages = [];
      this.chatMessagesSubject.next([]);
      console.log('Disconnected');
    }
  }

  sendMessage(user: string, message: string): void {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.publish({
        destination: '/app/new-message',
        body: JSON.stringify({ user, message })
      });
    }
  }
}
