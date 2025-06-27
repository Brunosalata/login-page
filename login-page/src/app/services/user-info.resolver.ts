import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { LoginService } from './login.service';
import { Observable } from 'rxjs';
import { UserInfo } from '../types/user-info.type';

@Injectable({
  providedIn: 'root'
})
export class UserInfoResolver implements Resolve<UserInfo> {
  constructor(private loginService: LoginService) {}

  resolve(): Observable<UserInfo> {
    return this.loginService.getUserInfo();
  }
}
