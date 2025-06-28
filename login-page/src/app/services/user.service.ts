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
export class UserService {
  apiUserInfoUrl: string = "http://localhost:8080/user"

  constructor(private httpClient: HttpClient) {
  }

  getUserInfo() {
    return this.httpClient.get<UserInfo>(`${this.apiUserInfoUrl}/info`);
  }

  updateUser(data: { name: string; password?: string }) {
    return this.httpClient.put(`${this.apiUserInfoUrl}/update`, data);
  }

  deleteUser() {
    return this.httpClient.delete(`${this.apiUserInfoUrl}/delete`);
  }

}
