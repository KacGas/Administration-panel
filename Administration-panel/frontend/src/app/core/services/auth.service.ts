import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {BehaviorSubject, Observable, tap} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `http://localhost:8080/api/auth`;

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.isAuthenticated());

  constructor(private http: HttpClient) {}

  get isAuthenticated$(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  login(username: string, password: string): Observable<any> {
    const body = { username, password };
    return this.http.post(`${this.apiUrl}/login`, body, { withCredentials: true }).pipe(
      tap(() => {
        localStorage.setItem('jwt_token', 'true');
        this.isAuthenticatedSubject.next(true);
      })
    );
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {}, { withCredentials: true }).pipe(
      tap(() => {
        localStorage.removeItem('jwt_token');
        this.isAuthenticatedSubject.next(false);
      })
    );
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('jwt_token');
  }

  isAdmin(): boolean {
    const token = localStorage.getItem('jwt_token');
    if (!token) return false;

    try {
      const payload = token.split('.')[1];
      const decodedPayload = atob(payload);
      const parsedPayload = JSON.parse(decodedPayload);
      return parsedPayload.isAdmin;
    } catch (error) {
      console.error('Error decoding token', error);
      return false;
    }
  }

}
