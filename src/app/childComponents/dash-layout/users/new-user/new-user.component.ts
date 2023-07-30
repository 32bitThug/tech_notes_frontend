import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent {
  private url='http://localhost:3500/users'
  
  roles: string[] = ['Employee', 'Admin', 'Manager',];
  username: string = '';
  password: string = '';
  selectedRoles: string[] = ['Employee'];
  errorMessage: string = '';
  constructor(private http:HttpClient,private router:Router){}

  // ngOnInit() {

  //   this.clearFormFields();
  // }

  // clearFormFields() {
  //   this.username = '';
  //   this.password = '';
  //   this.selectedRoles = ['Employee'];
  // }
  
  onSubmit() {
    const newUser = {
      username: this.username,  
      password: this.password,
      roles: this.selectedRoles
    };
    this.http.post(this.url, newUser)
    .subscribe(
      response => {
        // Handle the response from the server if needed
        this.router.navigateByUrl('/dash/users');
        console.log('User created:', response);
      },
      error => {
        // Handle error response from the server if needed
        console.error('Error:', error);
        this.errorMessage = error?.error?.message || 'An error occurred while creating the user.';
      }
    );

  }
}
