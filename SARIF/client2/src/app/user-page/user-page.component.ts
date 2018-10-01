import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import {AppComponent} from '../app.component';
import { UserLogService } from '../services/user-log.service';
import { UserService } from '../services/user.service';

@Component({
  providers: [AppComponent],
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  indicator = '';
  users = [];
  logs = [];
  editUser = [];

  constructor(private router: Router, 
    private loginService: LoginService, 
    private comp: AppComponent, 
    private logData: UserLogService,
    private userData: UserService,
    ) { }

  ngOnInit() {
    this.onOpened();
  }
  onOpened() {
      this.indicator = this.comp.getUserName();
  }

  logOut() {
    this.logData.create(this.comp.getUserName(), 'User Logout').subscribe();
    this.comp.delSession();
    this.router.navigate(['']);
  }

  onLog() {
    this.logData.findAll().subscribe(
      (userLog) => {
        document.getElementById("logTable").hidden = false; //Unhide table after onLog click
        document.getElementById("usersTable").hidden = true;
        this.logs = userLog;
      }
    )
  }

  viewUsers() {
    this.userData.findAll().subscribe(
      (user) => {
        document.getElementById("logTable").hidden = true; //Unhide table after onLog click
        document.getElementById("usersTable").hidden = false;
        this.users = user;
      }
    )
  }

  getUser(id: string) {
    // let id = document.getElementById("userId").;
    let userId = +id;
    this.userData.getUser(userId).subscribe(
      (getEditUser) => {
        this.editUser = getEditUser;
        document.getElementById("editUser").hidden = false; //Unhide table after onLog click
        document.getElementById("usersTable").hidden = true;
        this.router.navigate(['user/' + userId]);
      }
    )
  }

  createUser() {
    this.router.navigate(['AddUser']);
  }
}