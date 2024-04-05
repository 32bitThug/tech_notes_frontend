
import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/loginservice.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private auth: LoginService,private route:Router) {}

  onSubmit() {
    const data = {
      username: this.username,
      password: this.password
    };
    this.auth.login(data).subscribe(
      (res) => {
        console.log(res);
        localStorage.setItem('token', res.accessToken);
        this.route.navigate(['/dash'])
      },
      (error) => {
        this.errorMessage = error?.error?.message || 'An error occurred logging in.';
      }
      
    );
    
  }
}
