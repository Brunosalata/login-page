import { Component } from '@angular/core';
import { DefaultLoginLayoutComponent } from '../../components/default-login-layout/default-login-layout.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  sub: string;
  roles: string[];
  exp: number;
}

interface LoginForm {
  email: FormControl,
  password: FormControl
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    DefaultLoginLayoutComponent,
    ReactiveFormsModule,
    PrimaryInputComponent
  ],
  providers: [
    LoginService
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!: FormGroup<LoginForm>;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private toastService: ToastrService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }

  submit() {
    this.loginService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe({
      next: (res) => {
        this.toastService.success("Login feito com sucesso!");

        // Decode e redirecionamento
        const token = res.token;
        const decoded: JwtPayload = jwtDecode(token);

        if (decoded.roles.includes('ROLE_ADMIN')) {
          this.router.navigate(['admin']);
        } else if (decoded.roles.includes('ROLE_USER')) {
          this.router.navigate(['user']);
        } else {
          this.router.navigate(['unauthorized']);
        }
      },
      error: () => this.toastService.error("Erro inesperado. Tente novamente mais tarde")
    });
  }

  navigate() {
    this.router.navigate(["signup"])
  }
}
