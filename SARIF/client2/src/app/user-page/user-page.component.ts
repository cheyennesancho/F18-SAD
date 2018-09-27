import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import {AppComponent} from '../app.component';
import { UserLogService } from '../user-log.service';

@Component({
  providers: [AppComponent],
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  indicator = '';
  users = [];

  constructor(private router: Router, private loginService: LoginService, private comp: AppComponent, private logData: UserLogService) { }

  ngOnInit() {
    this.onOpened();
  }
  onOpened() {
      this.indicator = this.comp.getUserName();
  }

  logOut() {
    this.comp.delSession();
    this.router.navigate(['']);
  }
<<<<<<< HEAD

  onLog() {
    this.logData.findAll().subscribe(
      (user) => {
        document.getElementById("logTable").hidden = false; //Unhide table after onLog click
        this.users = user;
      }
    )
=======
  createUser() {
    this.router.navigate(['AddUser']);
>>>>>>> Tyler-G-Journal
  }
}
