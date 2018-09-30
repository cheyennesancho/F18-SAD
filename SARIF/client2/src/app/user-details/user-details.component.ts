import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Params } from '@angular/router';
import { AppComponent } from '../app.component';

 @Component({
  selector: 'app-userdetails',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  user = new User();
  data = [];
   constructor(
    private userService: UserService,
    private route: ActivatedRoute
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
    this.userService.updateUser(this.user)
      .subscribe(() => { console.log("User Updated Successfully")})
  }
 }