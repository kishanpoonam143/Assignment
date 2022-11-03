import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  isUserLogin: boolean = false;
  addTransactionAccess: boolean = false;
  viewTransactionAccess: boolean = false;
  showAddTransaction: boolean = true;
  isAdmin: boolean = false;
  constructor() { }

  ngOnInit(): void {
    if (!localStorage.getItem('userName') && !localStorage.getItem('password'))
      this.isUserLogin = false;
    else {
      this.isUserLogin = true;
      if (localStorage.getItem('userName') == 'admin' && localStorage.getItem('password') == 'admin') {
        this.isAdmin = true;
        this.addTransactionAccess = true;
        this.viewTransactionAccess = true;
        return;
      }
      this.addTransactionAccess = localStorage.getItem('addTransactionAccess') == 'true';
      this.viewTransactionAccess = localStorage.getItem('viewTransactionAccess') == 'true';
    }
  }
  handleAddTransaction() {
    this.showAddTransaction = true;
  }
  handleViewTransactions() {
    this.showAddTransaction = false;
  }
}
