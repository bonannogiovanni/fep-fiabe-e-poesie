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
  private currentUserSubject: BehaviorSubject<string>;

  constructor(private api: ApiService) {
    this.currentUserSubject = new BehaviorSubject<string>(
      localStorage.getItem('token') || ''
    );
  }

  public get currentUserValue(): string {
    return this.currentUserSubject.value;
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
              console.log('sto per scrivere il token ' + token);
              localStorage.setItem('token', token);
              this.currentUserSubject.next(token);
              //return authResult;
            }
            //return '';
          })
        )
    );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('token');
    this.currentUserSubject.next('');
  }
}
