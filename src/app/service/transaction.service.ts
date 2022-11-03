import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TransactionData } from '../model/transaction-model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  constructor(private httpClient: HttpClient) { }

  addTransaction(data :TransactionData) : Observable<any>{
    const httpHeaders = new HttpHeaders();
    httpHeaders.set('Access-Control-Allow-Origin', '*');
    return this.httpClient.post(environment.apiEndPoint+'/saveTransaction', data,{headers : httpHeaders});
  }
  getAllTransactions() : Observable<any>{
    const httpHeaders = new HttpHeaders();
    httpHeaders.set('Access-Control-Allow-Origin', '*');
    return this.httpClient.get(environment.apiEndPoint+'/listTransactions',{headers : httpHeaders});
  }
  getTransactionsByUserId(userId : String) : Observable<any>{
    return this.httpClient.get(environment.apiEndPoint+'/listTransactions/'+userId);
  }
  saveUser(data:any) : Observable<any>{
    return this.httpClient.post(environment.apiEndPoint+'/saveUser',data);
  }
  getUser(data: any) : Observable<any>{
    return this.httpClient.post(environment.apiEndPoint+'/getUser',data);
  }
  getAllUsers() : Observable<any>{
    return this.httpClient.get(environment.apiEndPoint+'/user/getAllUsers');
  }
  updateUserPermission(data:any) : Observable<any>{
    return this.httpClient.post(environment.apiEndPoint+"/user/updatePermissions",data);
  }
  getCustomerData(customerNumber : Number) : Observable<any>{
    return this.httpClient.get(environment.apiEndPoint+"/getCustomerdata/"+customerNumber);
  }
}
