import {
  computed,
  effect,
  inject,
  Injectable,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../../shared/interfaces/user.interface';
import { environment } from '../../../environments/environment.development';
import { firstValueFrom, map } from 'rxjs';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class AuthService {
  #userSignal = signal<IUser | null>(null);

  http = inject(HttpClient);

  private readonly platformId = inject(PLATFORM_ID);

  user = this.#userSignal.asReadonly();

  isLoggedIn = computed(() => !!this.user());

  environment = environment;

  userStorageKey = 'user';

  token: string;

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.loadUserFromLocalStorage();
      this.getToken();
    }
    if (isPlatformServer(this.platformId)) {
      console.log('server');
    }

    effect(() => {
      const user = this.user();
      if (user) {
        localStorage.setItem(this.userStorageKey, JSON.stringify(user));
      }
    });
  }

  loadUserFromLocalStorage() {
    const json = localStorage.getItem(this.userStorageKey);
    if (json) {
      const user = JSON.parse(json);
      this.#userSignal.set(user);
    }
  }

  async register(registerRequest: Partial<IUser>): Promise<IUser> {
    const user$ = this.http.post(
      `${this.environment.API_USER}/register`,
      registerRequest,
    );

    const result = await firstValueFrom(user$);
    return result['user'];
  }

  async login(loginRequest: Partial<IUser>): Promise<IUser> {
    const user$ = this.http.post(
      `${this.environment.API_USER}/login`,
      loginRequest,
    );

    const result = await firstValueFrom(user$);
    this.#userSignal.set(result['user']);
    return result['user'];
  }

  Logout() {
    localStorage.removeItem(this.userStorageKey);
    this.#userSignal.set(null);
  }

  async updateUser(id: string, user: Partial<IUser>): Promise<IUser> {
    const updatedUser$ = this.http.put(
      `${this.environment.API_USER}/update-user/${id}`,
      user,
    );
    const result = await firstValueFrom(updatedUser$);
    this.#userSignal.set(result['updatedUser']);
    return result['updatedUser'];
  }

  getToken() {
    const json = localStorage.getItem(this.userStorageKey);
    if (json) {
      const user = JSON.parse(json);
      this.token = user.token;
    } else {
      this.token = null;
    }
  }
}
