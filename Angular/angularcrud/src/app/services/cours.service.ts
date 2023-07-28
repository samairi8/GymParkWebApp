import { Injectable } from '@angular/core';
import { Cours } from '../models/cours';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursService {

  private apiUrl = 'https://localhost:7067/api/Cours';

  constructor(private http: HttpClient) { }

  getCourses(): Observable<Cours[]> {
    return this.http.get<Cours[]>(this.apiUrl);
  }

  getCourse(id: number): Observable<Cours> {
    return this.http.get<Cours>(`${this.apiUrl}/${id}`);
  }

  createCourse(course: Cours): Observable<Cours> {
    return this.http.post<Cours>(this.apiUrl, course);
  }

  updateCourse(id: number, updatedCourse: Cours): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, updatedCourse);
  }

  deleteCourse(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
