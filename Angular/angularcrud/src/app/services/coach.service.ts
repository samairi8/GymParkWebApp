import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Coach } from '../models/coach';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoachService {

  private apiUrl = 'https://localhost:7067/api/Coach';

  constructor(private http: HttpClient) { }

  getCoaches(): Observable<Coach[]> {
    return this.http.get<Coach[]>(this.apiUrl);
  }

  getCoach(id: number): Observable<Coach> {
    return this.http.get<Coach>(`${this.apiUrl}/${id}`);
  }

  createCoach(coach: Coach): Observable<Coach> {
    return this.http.post<Coach>(this.apiUrl, coach);
  }

  updateCoach(id: number, updatedCoach: Coach): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, updatedCoach);
  }

  deleteCoach(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
