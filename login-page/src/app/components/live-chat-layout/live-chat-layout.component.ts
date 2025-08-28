import { Component } from '@angular/core';
import {ChatService} from "../../services/live-chat.service";
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";


@Component({
  selector: 'app-live-chat-layout',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf
  ],
  templateUrl: './live-chat-layout.component.html',
  styleUrl: './live-chat-layout.component.scss'
})
export class LiveChatLayoutComponent {
  username: string = '';
  message: string = '';
  messages: string[] = [];

  constructor(private chatService: ChatService) {
    this.chatService.chatMessages$.subscribe(msgs => this.messages = msgs);
  }

  connect() {
    this.chatService.connect();
  }

  disconnect() {
    this.chatService.disconnect();
  }

  send() {
    if (this.username && this.message) {
      this.chatService.sendMessage(this.username, this.message);
      this.message = '';
    }
  }
}
