import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Auth {

  private apiUrl = 'https://crud-application-34e5.onrender.com/api/Auth';

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

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getCurrentUserId(): number | null {
    const token = localStorage.getItem('token');

    if (!token) {
      return null;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));

      const userId =
        payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];

        return userId ? Number(userId) : null;
    } catch {
      return null;
    }
  }
}
