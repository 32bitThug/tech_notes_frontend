// import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.css']
})
export class EditNoteComponent {
  constructor(private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private router:Router){}
  errorMessage: string = '';
  private url='http://localhost:3500/notes'
  note: any = {};
  
  ngOnInit() {

    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');
      console.log('Received id:', id);
      if (id) {
        this.getNotesDetails(id); // Fetch user details based on the id
        // this.currId=id;
      }
    });
  }
  getNotesDetails(id: string) {
    this.http.get(`${this.url}/${id}`).subscribe(
      (response: any) => {
        this.note = response;
        
        console.log(response)
      },
      error => {
        console.error('Error fetching note details:', error);
      }
    );
  }
  
  onSubmit(){
    const updatedNote={
      id:this.note._id,
      user:this.note.user,
      title:this.note.title,
      text:this.note.text,
      completed:this.note.completed
      
      }
    console.log(updatedNote)
    this.http.patch(this.url,updatedNote).subscribe(
      response => {
        // Handle the response from the server if needed
        this.router.navigateByUrl('/dash/notes');
        console.log('Note updated:', response);
      },
      error => {
        // Handle error response from the server if needed
        console.error('Error:', error);
        this.errorMessage = error?.error?.message || 'An error occurred while updating note.';
      }
    );
 
  }
  onDeleteNote() {
      
    const body = { id: this.note._id};
    this.http.delete(this.url,{body:body}).subscribe(
      () => {
        // Handle successful deletion
        console.log('User deleted successfully');
        // Redirect to a new page or reload the user list, etc.
        // For example, you can navigate to the user list page after deletion:
        this.router.navigateByUrl('/dash/notes');
      },
      error => {
        // Handle error response from the server if needed
        this.errorMessage = error?.error?.message || 'An error occurred while deleting the user.';
        console.error('Error deleting user:', error);
      }
    );
}

 
}
