import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute,ParamMap } from '@angular/router';
import { LogoutserviceService } from 'src/app/services/logout/logoutservice.service';

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
  dashClass :string | null= null;
  errorMessage:string=""
  constructor(private logoutService:LogoutserviceService,private router: Router) { 
  }

  ngOnInit() {
    this.currentPath = this.router.url;
    console.log('Current Path:', this.currentPath);
    if (!DASH_REGEX.test(this.currentPath) && !NOTES_REGEX.test(this.currentPath) && !USERS_REGEX.test(this.currentPath)) {
      this.dashClass = "dash-header__container--small";
      console.log(this.dashClass)
      }
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
