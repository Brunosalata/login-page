import { Component, Input } from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  @Input() title: string = 'Área';
  @Input() items: { label: string, icon?: string, path: string }[] = [];
}
