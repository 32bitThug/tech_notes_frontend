import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import {  HostListener } from '@angular/core';
import { Route, Router } from '@angular/router';
import { interval, fromEvent } from 'rxjs';
import { NotesListService } from 'src/app/services/notesList/notes-list.service';
@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  // styleUrls: ['./notes-list.component.css'],
  providers: [DatePipe]
})
export class NotesListComponent {
 notesList:any;
 errorMessage:String=""
  constructor(private http: HttpClient,
    private datePipe:DatePipe,
    private router:Router,
    private notesService:NotesListService){}
  ngOnInit() {
  this.getNotesList()
  interval(15000).subscribe(() => {
    this.getNotesList();
  });
  }
   getNotesList(){
    this.notesService.getNotesList().subscribe((res)=>{
      this.notesList=res;
    }, (error) => {
      this.errorMessage = error?.error?.message || 'An error occurred while creating the user.';

      console.error('Error fetching data:', error);
    })
    // this.notesList.sort((a:any, b:any) => {
    //   return a.completed === b.completed ? 0 : a.completed ? 1 : -1;
    // });
    //got console error here
   
  }
  formatDate(date: any): any {
    return this.datePipe.transform(date, 'dd MMM');
  }
  
  editUser(id:string){
    console.log(id)
    this.router.navigate(['dash/notes/',id]);
  }
  // calls getUSer when window is on focus
  @HostListener('window:focus', ['$event'])
  onFocus(event: Event): void {
    this.getNotesList();
  }
  
}
