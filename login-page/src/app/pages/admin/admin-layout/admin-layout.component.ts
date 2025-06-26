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
  sidebarItems = [
    { label: 'Dashboard', icon: '🏠', path: 'dashboard' },
    { label: 'Produtos', icon: '📦', path: 'products' },
    { label: 'Usuários', icon: '👤', path: 'users' }
  ];
}
