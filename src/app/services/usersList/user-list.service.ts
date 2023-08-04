import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserListService {

  private url = 'http://localhost:3500/users';

  constructor(private http: HttpClient) {}

  getUsersList(): Observable<any> {
    return this.http.get(this.url);
  }
}
