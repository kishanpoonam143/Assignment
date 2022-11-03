import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSidenav} from '@angular/material/sidenav'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('sidenav')
  sidenav!: MatSidenav;
  isUserLogin: boolean = false;
  addTransactionAccess: boolean = false;
  viewTransactionAccess: boolean = false;
  showAddTransaction: boolean = true;
  isAdmin: boolean = false;
  constructor(private router : Router) { }

  ngOnInit(): void {
    if (!localStorage.getItem('userName') && !localStorage.getItem('password'))
      this.isUserLogin = false;
    else {
      this.isUserLogin = true;
      if (localStorage.getItem('userName') == 'admin' && localStorage.getItem('password') == 'admin') {
        this.isAdmin = true;
        return;
      }
    }
  }
  logout(){
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }
  clickHandler() {
    this.sidenav.close();
  }
}
