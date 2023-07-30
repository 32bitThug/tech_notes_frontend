import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, merge, fromEvent, interval } from 'rxjs';
import { switchMap, startWith, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RefreshDataService {

  private dataCache: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  private pollingInterval = 10000;

  constructor(private http: HttpClient) { }

  getData(): Observable<any[]> {
    return this.dataCache.asObservable();
  }

  fetchData(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3500/users').pipe(
      tap((data) => this.dataCache.next(data))
    );
  }

  startPolling(): void {
    interval(this.pollingInterval).pipe(
      startWith(0),
      switchMap(() => this.fetchData())
    ).subscribe();
  }

  setupRefetchOnFocus(): void {
    fromEvent(window, 'focus').subscribe(() => {
      this.fetchData().subscribe();
    });
  }

  setupRefetchOnMountOrArgChange(arg: any): void {
    merge(this.fetchData(), fromEvent(window, 'focus')).subscribe();
  }
}
