import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import * as CryptoJS from 'crypto-js';
import { BehaviorSubject, map, tap } from 'rxjs';
// import * as bcrypt from 'bcrypt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated = false;
  private currentTokenSubject: BehaviorSubject<string>;

  constructor(private api: ApiService) {
    this.currentTokenSubject = new BehaviorSubject<string>(
      localStorage.getItem('token') || ''
    );
  }

  public get currentTokenValue(): string {
    return this.currentTokenSubject.value;
  }

  authenticate(credentials: any) {
    return (
      this.api
        .login({
          ...credentials,
          password: CryptoJS.MD5(credentials.password).toString(),
        })
        //  .subscribe((authResult) => {
        //     if (authResult.isAuthenticated) {
        //       localStorage.setItem('id_token', authResult.idToken);
        //       this.isAuthenticated = true;
        //     }
        //   });

        .pipe(
          tap(({ isAuthenticated, token }) => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            if (isAuthenticated) {
              localStorage.setItem('token', token);
              this.currentTokenSubject.next(token);
              //return authResult;
            }
            //return '';
          })
        )
    );
  }

  hasTokenExpired(): boolean {
    
    if (this.currentTokenValue) {
      const jwtPayload = JSON.parse(
        window.atob(this.currentTokenValue.split('.')[1])
      );
      if (new Date(jwtPayload.exp * 1000) <= new Date()) {
        this.logout();
        return true;
      } else {
        return false;
      }
    }

    return true;
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('token');
    this.currentTokenSubject.next('');
  }
}
