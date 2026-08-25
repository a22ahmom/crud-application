import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Auth {

  private apiUrl = 'http://localhost:5170/api/Auth';

  constructor(private http: HttpClient) {}

  register(username: string, password: string)
  {
    const body = {
      username: username,
      password: password
    };

    return this.http.post(
      `${this.apiUrl}/register`,
      body,
      {
        responseType: 'text'
      }
    );
  }

  login(username: string, password: string)
  {
    const body = {
      username: username,
      password: password
    };

    return this.http.post<{ token: string }>(
      `${this.apiUrl}/login`,
      body
    );
  }

  logout() {
    localStorage.removeItem('token');
  }
}
