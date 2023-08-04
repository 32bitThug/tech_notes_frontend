import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotesListService {
  private url = 'http://localhost:3500/notes';

  constructor(private http: HttpClient) {}

  getNotesList(): Observable<any> {
    return this.http.get(this.url);
  }
}
