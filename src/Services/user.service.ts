import { Injectable } from '@angular/core';
import { User } from 'src/models/user.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = `http://localhost:8080/user`;

  constructor(
    private http: HttpClient
    ) { }

  getUsers(): Observable<User[]> {
    const url = `${this.baseUrl}`;
    return this.http.get<User[]>(url);
  }
}
