import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const BASE_URL = environment.JSON_SERVER_BASE_URL;

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  createKid(kid: any) {
    return this.http.post<any>(`${BASE_URL}/kids/`, kid);
  }

  updateKid(kid: any, id: string) {
    return this.http.put<any>(`${BASE_URL}/kids/${id}`, kid);
  }

  getKids() {
    return this.http.get<any>(`${BASE_URL}/kids/`);
  }

  getKid(id: string) {
    return this.http.get<any>(`${BASE_URL}/kids/${id}`);
  }

  deleteKid(id: string) {
    return this.http.delete<any>(`${BASE_URL}/kids/${id}`);
  }

  login(credentials: any) {
    return this.http.post<any>(`${BASE_URL}/users/`, credentials);
  }

  // getUsers() {
  //   return this.http.get<any>(`${BASE_URL}/users`).subscribe(
  //     (users: any) => {
  //       const user = users.find(
  //         (u: any) =>
  //           u.username === this.loginForm.value.username &&
  //           u.password === this.loginForm.value.password
  //       );
  //       if (user) {
  //         this.loginForm.reset();
  //         this.router.navigate(['dashboard']);
  //       } else {
  //         alert('user e/o password errate');
  //       }
  //     },
  //     (err) => {
  //       console.log(err);
  //       alert('Errore');
  //     }
  //   );
  // }
}
