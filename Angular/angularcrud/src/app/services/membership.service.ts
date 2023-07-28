import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Membership } from '../models/membership';

@Injectable({
  providedIn: 'root'
})
export class MembershipService {
  private apiUrl = "https://localhost:7067/api/Membership";
  constructor(private http: HttpClient) {
  }
  GetMemberships(): Observable<Membership[]> {
    return this.http.get<Membership[]>(this.apiUrl);
  }
  getMembership(id: number): Observable<Membership> {
    return this.http.get<Membership>(`${this.apiUrl}/${id}`);
  }

  createMembership(membership: Membership): Observable<any> {
    return this.http.post(this.apiUrl, membership);
  }
  updateMembership(id: number, membership: Membership): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/${id}`, membership);
  }

  deleteMembership(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  
}
