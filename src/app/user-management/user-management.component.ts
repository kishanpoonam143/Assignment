import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../service/transaction.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  users : any = [];
  errorMsg : string = '';
  succMsg : string = '';
  constructor(private transactionService : TransactionService) { }

  ngOnInit(): void {
    this.transactionService.getAllUsers().subscribe(res=>{
      this.users = res?.data;
    },err=>{
      this.errorMsg = err?.message || err;
    })
  }
  updateAccess(){
    this.transactionService.updateUserPermission(this.users).subscribe(res=>{
      if(res?.data)
        this.succMsg = "Permissons updated successfully";
      else
        this.errorMsg = "Failed to update permissions";
    },error=>{
      if(error)
        this.errorMsg = error?.message || error;
    })
    setTimeout(()=>{
      this.succMsg = '';
      this.errorMsg = ''
    },10000)
  }
  handleAdd(item: any, event:any){
    this.users.some((user:any)=>{
      if(user.userId ==item.userId){
        user.addTransactionAccess = event.target.checked;
        return true;
      }else
      return false;
    });
  }
  handleView(item:any,event:any){
    this.users.some((user:any)=>{
      if(user.userId ==item.userId){
        user.viewTransactionAccess = event.target.checked;
        return true;
      }
      else
      return false;
    });
  }
}
