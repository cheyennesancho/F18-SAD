import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { AppComponent } from '../app.component';
import { User } from '../user';
@Component({
  providers: [AppComponent],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  password: string;
  username: string;
  invalidIndicator = '';
  user: User;

  constructor(
    private router: Router, private loginService: LoginService, private comp: AppComponent,
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.loginService.sendData(this.username, this.password).subscribe(
      user => {
        this.user = user;
        console.log('Login success, userType = ', this.user.userName);

        if (this.user.userId > 0) {
          this.router.navigate(['UserPage']);
          this.comp.setSession(this.user.userId, this.user.userName, this.user.userRole);
        }
        else {
          this.invalidIndicator = 'Login failed';
        }
      }
    );
  }



}

