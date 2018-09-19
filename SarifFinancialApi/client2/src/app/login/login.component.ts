import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { User } from '../user';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  password: string;
  username: string;
  invalidIndicator = '';

  constructor(
    private router: Router, private loginService: LoginService
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.loginService.sendData(this.username, this.password).subscribe(
      (number: number) => {
        console.log('Login success, userType = ', this.username);
        if (number > 0) {
          this.router.navigate(['UserPage']);
        } else {
          this.invalidIndicator = 'Loggin failed';
        }
      }
    );
  }



}

