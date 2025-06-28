import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, RouterOutlet} from '@angular/router';
import {SidebarComponent} from "../../../components/sidebar/sidebar.component";
import {UserInfo} from "../../../types/user-info.type";

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [SidebarComponent, RouterOutlet],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss'
})

export class AdminLayoutComponent implements OnInit{
  sidebarItems = [
    { label: 'Dashboard', icon: '🏠', path: 'dashboard' },
    { label: 'Produtos', icon: '📦', path: 'products' },
    { label: 'Usuários', icon: '👤', path: 'users' }
  ];

  userInfo: UserInfo = { name: '', email: '', role: '' };

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const userData = this.route.snapshot.data['user'] as UserInfo;
    this.userInfo = { name: userData.name, email: userData.email, role: this.getRoleMessage(userData.role) };
  }

  getRoleMessage(role: string): string {
    if (role.includes('ADMIN')) {
      return 'Acesso total ao sistema';
    }
    if (role.includes('USER')) {
      return 'Acesso limitado à área do usuário';
    }
    return 'Bem-vindo(a)';
  }

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
