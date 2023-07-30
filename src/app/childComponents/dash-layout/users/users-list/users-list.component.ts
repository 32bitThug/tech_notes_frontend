import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {  HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { interval, fromEvent } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators'
@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent {
  private url='http://localhost:3500/users'
  userList:any;
  errorMessage:string=""
  constructor(private http: HttpClient,private router:Router){}
  ngOnInit() {
  this.getUsersList()
  interval(60000).subscribe(() => {
    this.getUsersList();
  });
  }
   getUsersList(){
    this.http.get(this.url).subscribe((res)=>{
      console.log(res);
      this.userList=res;
    }, (error) => {
     
      console.error('Error fetching data:', error);
      this.errorMessage = error?.error?.message || 'An error occurred while creating the user.';
    })
  }
  editUser(id:string){
    console.log(id)
    this.router.navigate(['dash/users/',id]);
  }
  @HostListener('window:focus', ['$event'])
  onFocus(event: Event): void {
    this.getUsersList();
  }
  
}
