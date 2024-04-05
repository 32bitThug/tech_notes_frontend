import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './childComponents/layout/layout.component';

import { LoginComponent } from './features/auth/login/login.component';
import { DashLayoutComponent } from './childComponents/dash-layout/dash-layout.component';


import { UsersListComponent } from './childComponents/dash-layout/users/users-list/users-list.component';
import { NotesListComponent } from './childComponents/dash-layout/notes/notes-list/notes-list.component';
import { WelcomeComponent } from './childComponents/dash-layout/welcome/welcome.component';

import { HttpClientModule } from '@angular/common/http';
import { NewUserComponent } from './childComponents/dash-layout/users/new-user/new-user.component';
import { EditUserComponent } from './childComponents/dash-layout/users/edit-user/edit-user.component';
import { FormsModule } from '@angular/forms';
import { NewNoteComponent } from './childComponents/dash-layout/notes/newNote/new-note/new-note.component';
import { EditNoteComponent } from './childComponents/dash-layout/notes/edit-note/edit-note.component';


@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    LoginComponent,
    DashLayoutComponent,
    UsersListComponent,
    NotesListComponent,
    WelcomeComponent,
    NewUserComponent,
    EditUserComponent,
    NewNoteComponent,
    EditNoteComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
