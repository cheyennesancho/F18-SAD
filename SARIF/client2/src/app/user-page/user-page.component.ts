import { AppComponent } from './../app.component';
import { BrowserModule } from '@angular/platform-browser';
import { UserDetailsComponent } from './../user-details/user-details.component';
import { Component, OnInit, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { UserLogService } from '../services/user-log.service';
import { UserService } from '../services/user.service';
import { ModalComponent } from '../modal/modal.component';
import { NgbModule, NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    ModalComponent,
    UserDetailsComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot()
  ],
  providers: [
    NgbActiveModal
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    UserDetailsComponent
  ]
})

@Component({
  providers: [AppComponent],
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  indicator = '';
  access = 1;
  users = [];
  logs = [];
  editUser = [];

  constructor(private router: Router, 
    private loginService: LoginService, 
    private comp: AppComponent, 
    private logData: UserLogService,
    private userData: UserService,
    private modalService: NgbModal,
    ) { }

  ngOnInit() {
    this.onOpened();
  }
  onOpened() {
      this.indicator = this.comp.getUserName();
      if(this.comp.getRole() === 'admin'){
        this.access = 1;
      }
      else if(this.comp.getRole() === 'manager') {
        this.access = 2;
      }
      else{
        this.access = 3;
      }
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

  chartOfAccounts() {
    this.router.navigate(['AddAccount'])
  }

  open() {
    const modalRef = this.modalService.open(UserDetailsComponent);
    modalRef.componentInstance.title = 'UserDetails';
}
}
