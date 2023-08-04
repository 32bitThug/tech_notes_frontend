import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
})
export class WelcomeComponent {
  constructor(private route:ActivatedRoute,private router: Router) { 
    
  }
  getCurrentDateTime(): string {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    };
    const dateTime = new Intl.DateTimeFormat('en-US', options).format(date);
    return dateTime;
  }
  goToUsersList(){
    this.router.navigate(['/dash/users']);
  }
  goToNotesList(){
    this.router.navigate(['/dash/notes']);
  }
}
