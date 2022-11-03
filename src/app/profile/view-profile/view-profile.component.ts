import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {

  userName: string = '';
  password: string = '';
  constructor(private router: Router) { }

  ngOnInit(): void {
    if (!localStorage.getItem('userName') && !localStorage.getItem('password'))
      this.router.navigateByUrl('/transactions');
    else {
      this.userName = localStorage.getItem('userName');
      this.password = localStorage.getItem('password');
    }
  }
}
