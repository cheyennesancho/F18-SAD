import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { UserPageComponent } from '../user-page/user-page.component';
import { AddUserComponent } from '../add-user/add-user.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'UserPage',
    component: UserPageComponent
  },
  {
    path: 'AddUser',
    component: AddUserComponent
  }
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }

export const routingComponents = [
  LoginComponent,
  UserPageComponent
]
