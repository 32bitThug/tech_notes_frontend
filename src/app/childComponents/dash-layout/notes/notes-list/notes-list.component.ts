import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import {  HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { interval, fromEvent } from 'rxjs';
@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.css'],
  providers: [DatePipe]
})
export class NotesListComponent {
  private url='http://localhost:3500/notes'
 notesList:any;
  constructor(private http: HttpClient,private datePipe:DatePipe){}
  ngOnInit() {
  this.getNotesList()
  interval(15000).subscribe(() => {
    this.getNotesList();
  });
  }
   getNotesList(){
    this.http.get(this.url).subscribe((res)=>{
      console.log(res);
      this.notesList=res;
    }, (error) => {
     
      console.error('Error fetching data:', error);
    })
    this.notesList.sort((a:any, b:any) => {
      return a.completed === b.completed ? 0 : a.completed ? 1 : -1;
    });
   
  }
  formatDate(date: any): any {
    return this.datePipe.transform(date, 'dd MMM');
  }
  
  editUser(item:any){

  }
  // calls getUSer when window is on focus
  @HostListener('window:focus', ['$event'])
  onFocus(event: Event): void {
    this.getNotesList();
  }
  
}
