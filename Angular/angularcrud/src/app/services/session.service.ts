import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Session } from '../models/session';
import { Observable } from 'rxjs';
import { Coach } from '../models/coach';
import { Cours } from '../models/cours';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private apiUrl = 'https://localhost:7067/api/Session'; // Replace with your API URL
  private coachUrl = 'https://localhost:7067/api/Coach'; // Replace with the API URL for coaches
  private coursUrl='https://localhost:7067/api/Cours';
  constructor(private http: HttpClient) { }

  getSessions(): Observable<Session[]> {
    return this.http.get<Session[]>(`${this.apiUrl}`);
  }

  getSession(id: number): Observable<Session> {
    return this.http.get<Session>(`${this.apiUrl}/${id}`);
  }

  createSession(session: Session): Observable<Session> {
    return this.http.post<Session>(`${this.apiUrl}`, session);
  }

  updateSession(id: number, session: Session): Observable<Session> {
    return this.http.put<Session>(`${this.apiUrl}/${id}`, session);
  }

  deleteSession(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  
  getCoaches(): Observable<Coach[]> {
    return this.http.get<Coach[]>(this.coachUrl);
  }

  // Add the return type for getCourses() if it's not already specified
  getCourses(): Observable<Cours[]> {
    return this.http.get<Cours[]>(this.coursUrl);
  }

}
