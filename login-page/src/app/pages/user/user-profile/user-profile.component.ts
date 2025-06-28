import {Component, inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from "../../../services/user.service";
import {PrimaryInputComponent} from "../../../components/primary-input/primary-input.component";

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    PrimaryInputComponent
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit {
  private userService = inject(UserService);
  private router = inject(Router);
  private toast = inject(ToastrService);

  profileForm!: FormGroup;

  ngOnInit(): void {
    this.profileForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl({ value: '', disabled: true }), // email fixo
      password: new FormControl('', [Validators.minLength(6)]),
      passwordConfirm: new FormControl('', [])
    });

    this.userService.getUserInfo().subscribe(user => {
      this.profileForm.patchValue({
        name: user.name,
        email: user.email
      });
    });
  }

  update(): void {
    const { name, password, passwordConfirm } = this.profileForm.getRawValue();

    if (password && password !== passwordConfirm) {
      this.toast.error('As senhas não coincidem.');
      return;
    }

    this.userService.updateUser({ name, password }).subscribe({
      next: () => this.toast.success('Dados atualizados com sucesso.'),
      error: () => this.toast.error('Erro ao atualizar os dados.')
    });
  }

  delete(): void {
    const confirmDelete = confirm('Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.');

    if (confirmDelete) {
      this.userService.deleteUser().subscribe({
        next: () => {
          this.toast.success('Conta excluída.');
          sessionStorage.clear();
          this.router.navigate(['/login']);
        },
        error: () => this.toast.error('Erro ao excluir a conta.')
      });
    }
  }
}
