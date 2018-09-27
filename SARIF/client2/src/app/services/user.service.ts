import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersUrl = 'http://localhost:8080/api/users';  // URL to web api
  constructor(
    private http: HttpClient
  ) { }

  getUsers (): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);
  }

  getUser(userId: number): Observable<User> {
    const url = `${this.usersUrl}/${userId}`;
    return this.http.get<User>(url);
  }

  addUser (user: User): Observable<User> {
    return this.http.post<User>(this.usersUrl, user, httpOptions);
  }

  deleteUser (user: User | number): Observable<User> {
    const userId = typeof user === 'number' ? user : user.userId;
    const url = `${this.usersUrl}/${userId}`;

    return this.http.delete<User>(url, httpOptions);
  }

  updateUser (user: User): Observable<any> {
    return this.http.put(this.usersUrl, User, httpOptions);
  }
}
