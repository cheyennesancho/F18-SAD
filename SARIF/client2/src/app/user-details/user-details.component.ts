
import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { UserLogService } from '../services/user-log.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-userdetails',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  user = new User();
  data = [];
  constructor(
    private router: Router,
    private userService: UserService,
    private route: ActivatedRoute,
    private logData: UserLogService,
    private comp: AppComponent,
  ) { }
  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    console.log(id);
    this.userService.getUser(id).subscribe(
      (user) => {
        this.data = user;
        console.log(this.data);
      }
    )
  }

  updateUser() {
    let userData = [];
    userData = this.data;
    this.userService.updateUser(userData)
      .subscribe(() => {
        console.log('User Updated Successfully');
        console.log(userData);
        this.logData.create(this.comp.getUserName(), 'Updated user').subscribe();
        this.router.navigate(['UserPage']);
      })
  }
}