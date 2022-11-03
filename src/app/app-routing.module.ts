import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTransactionComponent } from './add-transaction/add-transaction.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ViewProfileComponent } from './profile/view-profile/view-profile.component';
import { RegisterComponent } from './register/register.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { ViewTransactionsComponent } from './view-transactions/view-transactions.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path : "login", component: LoginComponent},
  { path : "addTransaction", component : AddTransactionComponent},
  { path : "viewTransactions", component : ViewTransactionsComponent},
  { path : "profile", component : ViewProfileComponent},
  { path : "register", component : RegisterComponent},
  { path : "userMgmt", component : UserManagementComponent},
  { path : "transactions", component: TransactionsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
