import { Component, OnInit } from '@angular/core';
import { CoA } from '../chart-of-accounts';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-chart-of-accounts',
  templateUrl: './chart-of-accounts.component.html',
  styleUrls: ['./chart-of-accounts.component.css']
})
export class ChartOfAccountsComponent implements OnInit {
  normalSide: string;

  constructor() { }

  ngOnInit() {}

  accountTypeChosen() {
    let x = document.getElementById("accountType").;
    console.log(x);
    if (document.getElementById("accountType").getAttribute("value")) 
    {console.log(document.getElementById("accountType").getAttribute("value"))}
    // this.normalSide = document.getElementById("accountType").innerHTML.valueOf();
    // console.log(this.normalSide);
    // if (this.normalSide == "assets") {
    //   console.log(this.normalSide);
    //   document.getElementById("credit").hidden = false;
    // }
  }
}
