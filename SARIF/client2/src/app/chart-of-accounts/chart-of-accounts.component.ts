import { Component, OnInit } from '@angular/core';
import { CoA } from '../chart-of-accounts';
import { AppComponent } from '../app.component';
import { CoAService } from '../services/coa.service';
import { UserLogService } from '../services/user-log.service';
import { ResourceLoader } from '@angular/compiler';
import { isEmpty } from 'rxjs/operators';

@Component({
  selector: 'app-chart-of-accounts',
  templateUrl: './chart-of-accounts.component.html',
  styleUrls: ['./chart-of-accounts.component.css']
})
export class ChartOfAccountsComponent implements OnInit {
  CoA = new CoA();
  editCoA = new CoA();
  accounts = [];
  accountData = [];
  accountId: number;

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
      let createAccountModal = document.getElementById("createAccountModal");
      if (event.target == createAccountModal) {
        createAccountModal.style.display = "none";
      }
      let editAccountModal = document.getElementById("editAccountModal");
      if (event.target == editAccountModal) {
        editAccountModal.style.display = "none";
      }
    }

  }

  //Opens modal
  createAccount() {
    let modal = document.getElementById("createAccountModal");
    modal.style.display = "block";
  }

  submit() {
    console.log(this.CoA.accountName);

    //Set asset and revenue account types to normal side debit
    if (this.CoA.accountType == "Assets" || this.CoA.accountType == "Revenue") {
      this.CoA.normalSide = "Debit";
    }
    else {
      this.CoA.normalSide = "Credit";
    }
    if (this.CoA.comment == "") {
      console.log("empty")
    }
    //Set the current balance to the original balance
    this.CoA.currentBalance = this.CoA.originalBalance;
    this.editCoA = this.CoA;
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
    let editModal = document.getElementById("editAccountModal");
    editModal.style.display = "none";
  }

  //Get account info to edit and load modal
  getAccount(id: number) {
    this.accountId = +id;
    this.coaService.getAccount(this.accountId)
      .subscribe((account) => {
        this.accountData = account;
        //console.log(account);
      });
    let modal = document.getElementById("editAccountModal");
    modal.style.display = "block";
  }

  submitEdit() {
    //Set the account Id correctly to chosen account
    this.editCoA.caId = this.accountId;

    //Set asset and revenue account types to normal side debit
    if (this.editCoA.accountType == "Assets" || this.editCoA.accountType == "Revenue") {
      this.editCoA.normalSide = "Debit";
    }
    else {
      this.editCoA.normalSide = "Credit";
    }
    //Reset current balance to new orignal balance
    this.editCoA.currentBalance = this.editCoA.originalBalance;

    this.coaService.updateAccount(this.editCoA)
      .subscribe(() => {
        alert("Account updated");
        console.log(this.editCoA);
        this.logData.create(this.comp.getUserName(), 'Updated account ' + this.editCoA.accountName).subscribe();
        let modal = document.getElementById("editAccountModal");
        modal.style.display = "none";
        location.reload();
      })
  }
}