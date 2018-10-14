import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../services/user.service';
import { UserLogService } from '../services/user-log.service';
import { Location } from '@angular/common';
import { AppComponent } from '../app.component';
import {SharedDataService } from '../services/shared-data.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})

export class AddUserComponent implements OnInit{

  user = new User();
  users = [];
  editUser = [];
  submitted = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private location: Location,
    private logData: UserLogService,
    private comp: AppComponent,
    private data: SharedDataService,
    private userData: UserService,
  ) { }
  ngOnInit() {
    this.viewUsers();
    }

  viewUsers() {
    this.userData.findAll().subscribe(
      (user) => {
        this.users = user;
      }
    );
  }

  newUser(): void {
    this.submitted = false;
    this.user = new User();
  }

 addUser() {
   this.submitted = true;
   this.save();
 }

  goBack(): void {
    this.data.changeToggle(1);
  }

  private save(): void {
    this.userService.addUser(this.user)
        .subscribe(() => {
          this.logData.create(this.comp.getUserName(), 'Created user ' + this.user.firstName).subscribe();
        });
  }

  getUser(id: string) {
    // let id = document.getElementById("userId").;
    let userId = +id;
    this.userData.getUser(userId).subscribe(
      (getEditUser) => {
        this.editUser = getEditUser;
        document.getElementById("editUser").hidden = false; //Unhide table after onLog click
        document.getElementById("showUsersTable").hidden = true;
        this.router.navigate(['user/' + userId]);
      }
    );
  }

  sort(n) {
    var table, rows, switching, shouldSwitch, x, y, switchCount = 0;
    table = document.getElementById("usersTable");
    switching = true;
    // Set the sorting direction to ascending:
    let dir = "asc";
    while (switching) {
      switching = false;
      rows = table.rows;

      for (var i = 1; i < (rows.length - 1); i++) {
        shouldSwitch = false;
        x = rows[i].getElementsByTagName("TD")[n];
        y = rows[i + 1].getElementsByTagName("TD")[n];

        if (dir == "asc") {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            shouldSwitch = true;
            break;
          }
        } else if (dir == "desc") {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            shouldSwitch = true;
            break;
          }
        }
      }

      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        switchCount++;
      } else {
        if (switchCount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  }
}
