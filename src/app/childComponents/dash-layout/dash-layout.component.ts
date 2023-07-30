import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute,ParamMap } from '@angular/router';
import { format } from 'date-fns-tz';
@Component({
  selector: 'app-dash-layout',
  templateUrl: './dash-layout.component.html',
  styleUrls: ['./dash-layout.component.css']
})

export class DashLayoutComponent implements OnInit {
  currentPath: string | undefined;
  constructor(private route:ActivatedRoute,private router: Router) { 
    console.log('l')
  }
  ngOnInit() {
    this.currentPath = this.router.url;
    console.log('Current Path:', this.currentPath);
  }
  redirectToSomePath() {
    this.router.navigate(['/dash']);
  }
  
}
