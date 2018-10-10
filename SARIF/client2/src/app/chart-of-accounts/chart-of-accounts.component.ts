import { Component, OnInit } from '@angular/core';
import { CoA } from '../chart-of-accounts';
import { AppComponent } from '../app.component';
import { CoAService } from '../services/coa.service';
import { UserLogService } from '../services/user-log.service';
import { ResourceLoader } from '@angular/compiler';

@Component({
  selector: 'app-chart-of-accounts',
  templateUrl: './chart-of-accounts.component.html',
  styleUrls: ['./chart-of-accounts.component.css']
})
export class ChartOfAccountsComponent implements OnInit {
  CoA = new CoA();
  accounts = [];

  constructor(
    private coaService: CoAService,
    private logData: UserLogService,
    private comp: AppComponent,
  ) { }

  ngOnInit() {
    this.coaService.findAll().subscribe(
      (account) => {
        this.accounts = account;
      }
    )

    //Closes modal when user clicks outside of modal
    window.onclick = function (event) {
      let modal = document.getElementById("createAccountModal");
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }

  }

  //Opens modal
  createAccount() {
    let modal = document.getElementById("createAccountModal");
    modal.style.display = "block";
  }

  submit() {
    //Set asset and revenue account types to normal side debit
    if (this.CoA.accountType == "Assets" || this.CoA.accountType == "Revenue") {
      this.CoA.normalSide = "Debit";
    }
    else {
      this.CoA.normalSide = "Credit";
    }

    //Set the current balance to the original balance
    this.CoA.currentBalance = this.CoA.originalBalance;

    this.coaService.addAccount(this.CoA)
      .subscribe(() => {
        this.logData.create(this.comp.getUserName(), 'Created account ' + this.CoA.accountName).subscribe();
        alert("Account Created");
        //Close modal
        let modal = document.getElementById("createAccountModal");
        modal.style.display = "none";
        location.reload();
      });
  }

  //Closes modal after clicking on cancel in modal
  close() {
    let modal = document.getElementById("createAccountModal");
    modal.style.display = "none";
  }

}
