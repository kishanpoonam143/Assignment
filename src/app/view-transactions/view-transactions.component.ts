import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TransactionService } from '../service/transaction.service';

@Component({
  selector: 'app-view-transactions',
  templateUrl: './view-transactions.component.html',
  styleUrls: ['./view-transactions.component.css']
})
export class ViewTransactionsComponent implements OnInit {
  transactions: any = [];
  message: any = '';
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private transactionsService : TransactionService) { }

  displayedColumns: string[] = ['CustomerName', 'TransferAmount', 'TransferCurrency', 'Reference'];
  dataSource = new MatTableDataSource();
  ngOnInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    if(localStorage.getItem('userName') =='admin' && localStorage.getItem('password') =='admin'){
    this.transactionsService.getAllTransactions().subscribe(res=>{
      if(res)
        this.transactions = res;
        this.dataSource.data = res;
        this.message = res?.message;
    })
  }else{
    this.transactionsService.getTransactionsByUserId(localStorage.getItem('userId')).subscribe(res=>{
      if(res)
        this.transactions = res;
        this.message = res?.message;
    })
  }
  }

}
