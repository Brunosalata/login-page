import { Component } from '@angular/core';
import {LiveChatLayoutComponent} from "../../../components/live-chat-layout/live-chat-layout.component";

@Component({
  selector: 'app-user-live-chat',
  standalone: true,
  imports: [LiveChatLayoutComponent],
  templateUrl: './user-live-chat.component.html',
  styleUrl: './user-live-chat.component.scss'
})
export class UserLiveChatComponent {

}
