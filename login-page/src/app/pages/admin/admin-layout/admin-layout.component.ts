import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {SidebarComponent} from "../../../components/sidebar/sidebar.component";

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [SidebarComponent, RouterOutlet],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss'
})

export class AdminLayoutComponent {
  name = sessionStorage.getItem('username') || 'Usuário';
  email = this.getEmailFromToken();
  role = this.getRoleFromToken();

  sidebarItems = [
    { label: 'Dashboard', icon: '🏠', path: 'dashboard' },
    { label: 'Produtos', icon: '📦', path: 'products' },
    { label: 'Usuários', icon: '👤', path: 'users' }
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
