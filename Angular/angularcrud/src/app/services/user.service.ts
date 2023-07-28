import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpclient: HttpClient) { }
  baseurl = "https://localhost:7067/api/User";
  GetUser(): Observable<User[]> {
    return this.httpclient.get<User[]>(this.baseurl);
  }
  CreateUser(use: User): Observable<User> {
    console.log('Payload sent to server:', use); // Add this line to log the payload being sent
    return this.httpclient.post<User>(this.baseurl, use);
  }

  updateUser(use: User):Observable<User> {
    return this.httpclient.put<User>(this.baseurl + '/' + use.id, use);
  }
  deleteUser(id: number): Observable<void> {
    return this.httpclient.delete<void>(`${this.baseurl}/${id}`);
  }

}

