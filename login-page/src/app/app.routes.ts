import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/signup/signup.component';
import { UserComponent } from './pages/user/user.component';
import { AdminComponent } from './pages/admin/admin.component';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';
import { AuthGuardService } from './services/auth-guard.service';

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
        component: UserComponent,
        canActivate: [AuthGuardService],
        data: { roles: ['ROLE_USER', 'ROLE_ADMIN'] }
    },
    {
        path: "admin",
        component: AdminComponent,
        canActivate: [AuthGuardService],
        data: { roles: ['ROLE_ADMIN'] }
    },
    {
      path: 'unauthorized',
      component: UnauthorizedComponent
    }
];
