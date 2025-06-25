import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  sub: string;
  roles: string[];
  exp: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private TOKEN_KEY = 'auth-token';

  getToken(): string | null {
    return sessionStorage.getItem(this.TOKEN_KEY);
  }

  setToken(token: string): void {
    sessionStorage.setItem(this.TOKEN_KEY, token);
  }

  clear(): void {
    sessionStorage.removeItem(this.TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getUserRoles(): string[] {
      const token = sessionStorage.getItem('auth-token');
      if (!token) return [];

      try {
        const decoded = jwtDecode<JwtPayload>(token);
        return decoded.roles || [];
      } catch {
        return [];
      }
    }

  isAdmin(): boolean {
    return this.getUserRoles().includes('ROLE_ADMIN');
  }

  isUser(): boolean {
    return this.getUserRoles().includes('ROLE_USER');
  }
}
