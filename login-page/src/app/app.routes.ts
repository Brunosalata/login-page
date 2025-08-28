import {Routes} from '@angular/router';
import {LoginComponent} from './pages/login/login.component';
import {SignUpComponent} from './pages/signup/signup.component';
import {UnauthorizedComponent} from './pages/unauthorized/unauthorized.component';
import {AuthGuardService} from './services/auth-guard.service';
import {AdminLayoutComponent} from "./pages/admin/admin-layout/admin-layout.component";
import {UserProfileComponent} from "./pages/user/user-profile/user-profile.component";
import {UserProductsComponent} from "./pages/user/user-products/user-products.component";
import {AdminDashboardComponent} from "./pages/admin/admin-dashboard/admin-dashboard.component";
import {AdminProductsComponent} from "./pages/admin/admin-products/admin-products.component";
import {AdminUsersComponent} from "./pages/admin/admin-users/admin-users.component";
import {UserLayoutComponent} from "./pages/user/user-layout/user-layout.component";
import {UserInfoResolver} from "./services/user-info.resolver";

export const routes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "signup",
    component: SignUpComponent
  },
  {
    path: "user",
    component: UserLayoutComponent,
    canActivate: [AuthGuardService],
    data: {roles: ['ROLE_USER', 'ROLE_ADMIN']},
    resolve: {
      user: UserInfoResolver
    },
    children: [
      {path: 'profile', component: UserProfileComponent},
      {path: 'products', component: UserProductsComponent},
      { path: 'live-chat', loadComponent: () => import('./pages/user/user-live-chat/user-live-chat.component').then(m => m.UserLiveChatComponent) },
      {path: '', redirectTo: 'profile', pathMatch: 'full'}
    ]
  },
  {
    path: "admin",
    component: AdminLayoutComponent,
    canActivate: [AuthGuardService],
    data: {roles: ['ROLE_ADMIN']},
    resolve: {
      user: UserInfoResolver
    },
    children: [
      {path: 'dashboard', component: AdminDashboardComponent},
      {path: 'products', component: AdminProductsComponent},
      {path: 'users', component: AdminUsersComponent},
      {path: '', redirectTo: 'dashboard', pathMatch: 'full'}
    ]
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent
  },
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: '**', redirectTo: '/login'}
];
