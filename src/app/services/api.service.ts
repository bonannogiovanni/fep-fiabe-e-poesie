import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// const BASE_URL = 'http://localhost:3000';

const BASE_URL = "https://fep-json-server.herokuapp.com/"

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  createKid(kid: any) {
    return this.http.post<any>(`${BASE_URL}/bambini/`, kid);
  }

  updateKid(kid: any, id: number) {
    return this.http.put<any>(`${BASE_URL}/bambini/${id}`, kid);
  }

  getKids() {
    return this.http.get<any>(`${BASE_URL}/bambini/`);
  }

  getKid(id: number) {
    return this.http.get<any>(`${BASE_URL}/bambini/${id}`);
  }

  deleteKid(id: number) {
    return this.http.delete<any>(`${BASE_URL}/bambini/${id}`);
  }
}
