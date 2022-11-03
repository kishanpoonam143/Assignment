import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../service/transaction.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name : string = '';
  userName : string = '';
  password : string = '';
  confirmPassword : string = '';
  errorMsg : string = '';
  succMsg :string = '';
  constructor(private transactionService : TransactionService) { }

  ngOnInit(): void {}

  saveUser(){
    if(this.name == '' || this.userName == '' || this.password =='' || this.confirmPassword ==''){
    this.errorMsg = 'Please fill required fields';
    }
    else{
      if(this.password != this.confirmPassword)
      this.errorMsg = "Password and confirm password needs to match";
      else{
        this.errorMsg = '';
        var userData = {
          name : this.name,
          userName : this.userName,
          password : this.password,
          addTransactionAccess : false,
          viewTransactionAccess : false
        }
        this.transactionService.saveUser(userData).subscribe(res=>{
          res?.statusCode ==200 ? this.succMsg = res?.message :  this.errorMsg = res?.message; 
          if(res?.statusCode ==200) this.resetForm();
        })
      }
    }
    setTimeout(()=>{
      this.errorMsg = '';
    },3000)
  }
  resetForm(){
    this.userName = '';
    this.password = '';
    this.name = '';
    this.confirmPassword = '';
  }
}
