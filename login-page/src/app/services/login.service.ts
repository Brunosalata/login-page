import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {LoginResponse} from '../types/login-response.type';
import {Observable, tap} from 'rxjs';
import jwtDecode from 'jwt-decode';
import {Router} from '@angular/router';
import {UserInfo} from "../types/user-info.type";

interface JwtPayload {
  sub: string;
  roles: string[];
  exp: number;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  apiUrl: string = "http://localhost:8080/auth"
  apiUserInfoUrl: string = "http://localhost:8080/user"

  constructor(private httpClient: HttpClient) {
  }

  getUserInfo() {
    const token = sessionStorage.getItem('auth-token');
    return this.httpClient.get<UserInfo>(`${this.apiUserInfoUrl}/info`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  login(email: string, password: string) {
    return this.httpClient.post<LoginResponse>(`${this.apiUrl}/login`, {email, password}).pipe(
      tap((value) => {
        sessionStorage.setItem("auth-token", value.token)
        sessionStorage.setItem("username", value.name)
      })
    )
  }

  signup(name: string, email: string, password: string) {
    return this.httpClient.post<LoginResponse>(`${this.apiUrl}/register`, {name, email, password}).pipe(
      tap((value) => {
        sessionStorage.setItem("auth-token", value.token)
        sessionStorage.setItem("username", value.name)
      })
    )
  }

}
