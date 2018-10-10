import { UserDetailsComponent } from './user-details/user-details.component';
import { ModalComponent } from './modal/modal.component';
import { Component } from '@angular/core';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { NgbModule, NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({

  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    //CHANGING TO APP
  title = 'app';
  constructor(private _cookieService: CookieService,
              private localSt: LocalStorageService,
              private sessionSt: SessionStorageService,
              private modalService: NgbModal) {}

setCookies(){
    this._cookieService.put('test', 'testing cookie');
}
getCookie(){
    alert(this._cookieService.get('test'));
}
delCookies(){
    this._cookieService.remove('test');
}

setSession(id, userName, userRole) {
    this.sessionSt.store('userName', userName);
    this.sessionSt.store('id', id);
    this.sessionSt.store('userRole', userRole);
}
getSession(){
    alert(this.sessionSt.retrieve('logged-in'));
}
getUserName(){
    return this.sessionSt.retrieve('userName');
}
getRole(){
    return this.sessionSt.retrieve('userRole');
  }
delSession(){
    this.sessionSt.clear('userName');
    this.sessionSt.clear('id');
    this.sessionSt.clear('userRole');
}

open() {
    const modalRef = this.modalService.open(UserDetailsComponent);
    modalRef.componentInstance.title = 'UserDetails';
}
}
