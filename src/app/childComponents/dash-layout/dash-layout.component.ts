import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute,ParamMap } from '@angular/router';
import { LoginService } from 'src/app/services/login/loginservice.service';
import { LogoutserviceService } from 'src/app/services/logout/logoutservice.service';
import jwt_decode from 'jwt-decode';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const DASH_REGEX = /^\/dash(\/)?$/;
const NOTES_REGEX = /^\/dash\/notes(\/)?$/;
const USERS_REGEX = /^\/dash\/users(\/)?$/;

@Component({
  selector: 'app-dash-layout',
  templateUrl: './dash-layout.component.html',
  styleUrls: ['./dash-layout.component.css']
})

export class DashLayoutComponent implements OnInit {
  currentPath: string="";
  currentUser: string="";
  currentStatus: string="";
  dashClass :string | null= null;
  errorMessage:string=""
  constructor(private logoutService:LogoutserviceService,private router: Router,private loginS:LoginService,private http: HttpClient) { 
  }

  ngOnInit() {
    this.currentPath = this.router.url;
    console.log('Current Path:', this.currentPath);
    if (!DASH_REGEX.test(this.currentPath) && !NOTES_REGEX.test(this.currentPath) && !USERS_REGEX.test(this.currentPath)) {
      this.dashClass = "dash-header__container--small";
      }
      const token =  localStorage.getItem('token'); 
      console.log(token)
      if (token) {
        // const decodedToken: any = jwt_decode(token);
        // // console.log(decodedToken)
        // this.currentUser = decodedToken.UserInfo.username;
        // this.currentStatus = decodedToken.UserInfo.roles;
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        });
  
        // Make your HTTP request with the headers containing the authorization token
        console.log(headers)
        this.http.get('http://localhost:3500', { headers })
          .subscribe(
            (response) => {
              // Handle the response here
            },
            (error) => {
              // Handle errors
              console.log(error)
            }
          );
         
      }
      // console.log(token)
      console.log(token)
  }

  redirectToSomePath() {
    this.router.navigate(['/dash']);
  }
  logout(){
    this.logoutService.logout().subscribe(res=>{
      console.log(res)
      this.router.navigateByUrl('/')
    },
    error=>{
      this.errorMessage = error?.error?.message || 'An error occurred while logging out.';
    }
    )
    
  }
  
  
}

