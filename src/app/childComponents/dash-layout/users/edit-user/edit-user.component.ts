import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent {
  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient,private router:Router) {}
  private url='http://localhost:3500/users'
  user: any = {};
  roles: string[] = ['Employee', 'Admin', 'Manager'];
  username: string = '';
  password: string = '';
  selectedRoles: string[] = ['Employee'];
  errorMessage: string = '';
  isChecked = true;
  currId:string='';
  ngOnInit() {

    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');
      console.log('Received id:', id);
      if (id) {
        this.getUserDetails(id); // Fetch user details based on the id
        this.currId=id;
      }
    });
  }
  getUserDetails(id: string) {
    this.http.get(`${this.url}/${id}`).subscribe(
      (response: any) => {
        this.user = response;
        console.log(response)
      },
      error => {
        console.error('Error fetching user details:', error);
      }
    );
  }
  onDeleteUser() {
      
      const body = { id: this.currId};
      this.http.delete(this.url,{body:body}).subscribe(
        () => {
          // Handle successful deletion
          console.log('User deleted successfully');
          // Redirect to a new page or reload the user list, etc.
          // For example, you can navigate to the user list page after deletion:
          this.router.navigateByUrl('/dash/users');
        },
        error => {
          // Handle error response from the server if needed
          this.errorMessage = error?.error?.message || 'An error occurred while deleting the user.';
          console.error('Error deleting user:', error);
        }
      );
  }
  onSubmit(){
   const updatedUser={
      id:this.currId,
      username:this.user.username,
      roles:this.selectedRoles,
      active:this.isChecked,
      password:this.password
      
      }
    console.log(updatedUser)
    this.http.patch(this.url,updatedUser).subscribe(
      response => {
        // Handle the response from the server if needed
        this.router.navigateByUrl('/dash/users');
        console.log('User updated:', response);
      },
      error => {
        // Handle error response from the server if needed
        console.error('Error:', error);
        this.errorMessage = error?.error?.message || 'An error occurred while creating the user.';
      }
    );
 
  }
 
}

