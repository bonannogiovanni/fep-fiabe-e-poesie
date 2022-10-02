import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import * as CryptoJS from 'crypto-js';
// import * as bcrypt from 'bcrypt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated = false;

  constructor(private api: ApiService) {}

  authenticate(credentials: any) {

    return this.api.login({
      ...credentials,
      password: CryptoJS.MD5(credentials.password).toString(),
    });
  }
}
