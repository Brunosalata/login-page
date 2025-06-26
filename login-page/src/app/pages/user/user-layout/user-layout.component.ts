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
  sidebarItems = [
    { label: 'Perfil', icon: '👤', path: 'profile' },
    { label: 'Produtos', icon: '📊', path: 'products' }
  ];
}
