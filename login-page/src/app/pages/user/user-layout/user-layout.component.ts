import { Component } from '@angular/core';
import {ActivatedRoute, RouterOutlet} from "@angular/router";
import {SidebarComponent} from "../../../components/sidebar/sidebar.component";
import {UserInfo} from "../../../types/user-info.type";

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
  ngOnInit() {
    const userData = this.route.snapshot.data['user'] as UserInfo;
    this.userInfo = { name: userData.name, email: userData.email, role: this.getRoleMessage(userData.role) };
  }

  userInfo: UserInfo = { name: '', email: '', role: '' };

  constructor(private route: ActivatedRoute) {}

  getRoleMessage(role: string): string {
    if (role.includes('ADMIN')) {
      return 'Acesso total ao sistema';
    }
    if (role.includes('USER')) {
      return 'Acesso limitado à sua área';
    }
    return 'Bem-vindo(a)';
  }

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
