import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TransactionService } from '../service/transaction.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userName: string = '';
  password: string = '';
  errorMsg: string = '';
  isUserLogin : boolean = false;
  constructor(private router: Router, private transactionService: TransactionService) { }

  ngOnInit(): void {
    if (!localStorage.getItem('userName') && !localStorage.getItem('password'))
      this.isUserLogin = false;
    else {
      this.isUserLogin = true;
      this.router.navigateByUrl('/transactions');
    }
   }

  handleLogin() {
    this.errorMsg = '';
    if(this.userName == '' || this.password == ''){
        this.errorMsg = "Please fill login credentials";
    }
    else if (this.userName == 'admin' && this.password == 'admin'){
      localStorage.setItem('userName', this.userName);
      localStorage.setItem('password', this.password);
      this.router.navigateByUrl('/transactions');
    }
    else {
      var userData = {
        userName: this.userName,
        password: this.password
      }
      this.transactionService.getUser(userData).subscribe(res => {
        res?.statusCode == 400 ? this.errorMsg = res?.message : '';
        if (res?.statusCode == 200) {
          localStorage.setItem('userName', this.userName);
          localStorage.setItem('password', this.password);
          localStorage.setItem('addTransactionAccess',res?.data?.addTransactionAccess);
          localStorage.setItem('viewTransactionAccess',res?.data?.viewTransactionAccess);
          localStorage.setItem('userId', res?.data?.userId);
          this.router.navigateByUrl('/transactions');
        }
      }, error => {
        if (error)
          this.errorMsg = error?.message || error;
      })
    }
    setTimeout(()=>{
      this.errorMsg = '';
    },3000)
  }
}
