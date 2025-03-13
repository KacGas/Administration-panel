import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilmService {
  private apiUrl = `http://localhost:8080/api/films`;

  constructor(private http: HttpClient) { }

  getFilms(): Observable<any> {
    const token = localStorage.getItem('jwt_token');
    console.log('JWT Token:', token);
    if (!token) {
      console.error('Brak tokenu JWT');
      return throwError('Brak tokenu JWT');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get(this.apiUrl, { headers }).pipe(
      catchError(error => {
        console.error('Błąd podczas pobierania filmów', error);
        return throwError(error);
      })
    );
  }

  addFilm(film: any): Observable<any> {
    const token = localStorage.getItem('jwt_token');
    if (!token) throw new Error('No JWT token found');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post(this.apiUrl, film, { headers });
  }

  deleteFilm(id: number): Observable<any> {
    const token = localStorage.getItem('jwt_token');
    if (!token) throw new Error('No JWT token found');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.delete(`${this.apiUrl}/${id}`, { headers });
  }

  updateFilm(film: any): Observable<any> {
    const token = localStorage.getItem('jwt_token');
    if (!token) throw new Error('No JWT token found');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.put(`${this.apiUrl}/${film.id}`, film, { headers });
  }

}
