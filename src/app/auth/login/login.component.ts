import { Component, inject } from '@angular/core';
import { Button } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { PasswordModule } from 'primeng/password';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';
import { RouterLink } from '@angular/router';
import { IUser } from '../../shared/interfaces/user.interface';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Message } from 'primeng/message';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    Button,
    CardModule,
    DividerModule,
    InputTextModule,
    PaginatorModule,
    PasswordModule,
    ReactiveFormsModule,
    SelectButtonModule,
    RouterLink,
    Message,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  fb = inject(FormBuilder);
  router = inject(Router);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });
  authService = inject(AuthService);

  async onLogin() {
    const loginRequest: Partial<IUser> = { ...this.form.value };
    await this.authService.login(loginRequest).then((user) => {
      console.log(user);
      return this.router.navigate(['/']);
    });
  }
}
