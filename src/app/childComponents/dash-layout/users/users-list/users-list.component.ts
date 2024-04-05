import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {  HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { interval, fromEvent } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators'
import { UserListService } from 'src/app/services/usersList/user-list.service';
@Component({
  selector: 'app-users-list',
  templateUrl:'./users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent {
  
  userList:any;
  errorMessage:string=""
  constructor(private http: HttpClient,private router:Router,private userService: UserListService){}
  ngOnInit() {
  this.getUsersList()
  interval(60000).subscribe(() => {
    this.getUsersList();
  });
  }
   getUsersList(){
    this.userService.getUsersList().subscribe((res)=>{
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
