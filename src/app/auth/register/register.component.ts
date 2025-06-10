import { Component, inject, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { Button } from 'primeng/button';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputTextModule } from 'primeng/inputtext';
import { SelectButtonModule } from 'primeng/selectbutton';
import { AuthService } from '../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { Message } from 'primeng/message';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CardModule,
    Button,
    ReactiveFormsModule,
    InputGroupModule,
    InputTextModule,
    SelectButtonModule,
    FormsModule,
    PasswordModule,
    DividerModule,
    RouterLink,
    Message,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  fb = inject(FormBuilder);

  authService = inject(AuthService);

  router = inject(Router);

  form = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
    username: ['', Validators.required],
  });

  ngOnInit(): void {}

  async onRegister() {}
}
