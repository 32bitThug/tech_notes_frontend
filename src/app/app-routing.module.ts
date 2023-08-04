import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './childComponents/layout/layout.component';

import { LoginComponent } from './features/auth/login/login.component';
import { DashLayoutComponent } from './childComponents/dash-layout/dash-layout.component';

import { UsersListComponent } from './childComponents/dash-layout/users/users-list/users-list.component';
import { NotesListComponent } from './childComponents/dash-layout/notes/notes-list/notes-list.component';
import { WelcomeComponent } from './childComponents/dash-layout/welcome/welcome.component';

import { NewUserComponent } from './childComponents/dash-layout/users/new-user/new-user.component';
import { EditUserComponent } from './childComponents/dash-layout/users/edit-user/edit-user.component';

import { NewNoteComponent } from './childComponents/dash-layout/notes/newNote/new-note/new-note.component';
const routes: Routes = [
  {path:'',component:LayoutComponent},
  {path:'login',component:LoginComponent},
  {
    path:'dash',component:DashLayoutComponent,
    children:[
      {path:'',component:WelcomeComponent},
      {path:'notes',component:NotesListComponent},
      {path:'notes/new',component:NewNoteComponent}, 
      {path:'users',component:UsersListComponent},
      {path:'users/new',component:NewUserComponent},
      {path:'users/:id',component:EditUserComponent}
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
// export const routingComponents =[LayoutComponent,LoginComponent,DashLayoutComponent,NotesListComponent,UsersListComponent]
