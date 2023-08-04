import { Component } from '@angular/core';
import { UserListService } from '../../../../../services/usersList/user-list.service';
import { User } from '../../../users/edit-user/user.insterface';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-new-note',
  templateUrl: './new-note.component.html',
  styleUrls: ['./new-note.component.css']
})
export class NewNoteComponent {
  constructor(
    private usersService:UserListService,
    private http:HttpClient,
    private router:Router
  ){}
  private url='http://localhost:3500/notes'
  selectedUserName:string=""
  title:string=""
  text:string=""
  users:User[]=[];
  errorMessage:string=""
  onSubmit(){
    console.log(this.selectedUserName)
    const selectedUser = this.users.find(user => user.username === this.selectedUserName);
    console.log(selectedUser)
    if (selectedUser) {
      const note = {
        user: selectedUser._id, // Use the selected user's _id
        title: this.title,
        text: this.text
      };
      console.log(note)
      this.http.post(this.url, note)
      .subscribe(
        response => {
          // Handle the response from the server if needed
          this.router.navigateByUrl('/dash/notes');
          console.log('Note created:', response);
        },
        error => {
          // Handle error response from the server if needed
          console.error('Error:', error);
          this.errorMessage = error?.error?.message || 'An error occurred while creating the Note.';
        }
      );
    }
   
  }
  ngOnInit() {
    this.usersService.getUsersList().subscribe(
      (res: User[]) => {
        this.users = res;
        this.selectedUserName = this.users[0]?.username; // Set the first username as default
      },
      (err) => {
        this.errorMessage = err?.error?.message || 'An error occurred while fetching users.';
      }
    );
  }

 
  
}
