import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  jwtToken:string=""
  constructor(private http:HttpClient) { }
  login(data: any):Observable<any>{
    return this.http.post('http://localhost:3500/auth',data) 
  }
  

}
