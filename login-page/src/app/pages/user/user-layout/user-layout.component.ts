import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {SidebarComponent} from "../../../components/sidebar/sidebar.component";

@Component({
  selector: 'app-user-layout',
  standalone: true,
    imports: [
        RouterOutlet,
        SidebarComponent
    ],
  templateUrl: './user-layout.component.html',
  styleUrl: './user-layout.component.scss'
})
export class UserLayoutComponent {
  name = sessionStorage.getItem('username') || 'Usuário';
  email = this.getEmailFromToken();
  role = this.getRoleFromToken();

  sidebarItems = [
    { label: 'Perfil', icon: '👤', path: 'profile' },
    { label: 'Produtos', icon: '📊', path: 'products' }
  ];

  logout() {
    sessionStorage.clear();
    window.location.href = '/login';
  }

  private getEmailFromToken(): string {
    const token = sessionStorage.getItem('auth-token');
    if (!token) return '';
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.sub || '';
  }

  private getRoleFromToken(): string {
    const token = sessionStorage.getItem('auth-token');
    if (!token) return '';
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.roles?.[0] || '';
  }
}
