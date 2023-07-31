import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogoutserviceService {

  constructor(private http:HttpClient) { 

  }
  
  logout():Observable<any>{
    return this.http.post('http://localhost:3500/auth/logout',{})
  }
}

