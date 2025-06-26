import { Component, Input } from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {NgForOf, NgIf} from "@angular/common";


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    NgForOf,
    NgIf
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  getRoleMessage(): string {
    switch (this.role) {
      case 'ROLE_ADMIN':
        return 'Acesso total ao sistema';
      case 'ROLE_USER':
        return 'Acesso limitado à sua área';
      default:
        return 'Bem-vindo(a)';
    }
  }

  @Input() title: string = 'Área';
  @Input() items: { label: string, icon?: string, path: string }[] = [];

  @Input() name: string = '';
  @Input() email: string = '';
  @Input() role: string = '';
  @Input() onLogout: () => void = () => {};
}
