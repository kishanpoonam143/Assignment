import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TransactionService } from '../service/transaction.service';

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.css']
})
export class AddTransactionComponent implements OnInit {

  addForm: FormGroup;
  errorMsg: any;
  succMsg: any;
  customerNumber: any;
  type: any = 'New'
  hideAddress: boolean = false;
  disableCustomerNumber: boolean = true;
  constructor(private fb: FormBuilder, private transactionService: TransactionService) {
    this.addForm = this.fb.group({
      customerNumber: [null],
      customerName: ["", Validators.required],
      region: [""],
      address: [""],
      customerPhoneNumber: [""],
      currency: [""],
      amount: [""],
      bankName: [""],
      accountNumber: ["", null]
    });
  }

  ngOnInit(): void {
  }
  onSubmit() {
    if (this.addForm.valid) {
      this.addForm.value.userId = localStorage.getItem('userName');
      this.transactionService.addTransaction(this.addForm.value).subscribe(res => {
        if (res?.statusCode == 200)
          this.succMsg = res?.message;
        else
          this.errorMsg = res?.message;
        this.addForm.reset();
        Object.keys(this.addForm.controls).forEach((key) => {
          const control = this.addForm.controls[key];
          if (key == 'region' || key == 'currency') {
            control.setValue('');
          }
        });
      }, (error) => {
        if (error)
          this.errorMsg = error?.message || error;
      });
      setTimeout(() => {
        this.errorMsg = '';
        this.succMsg = '';
      }, 5000)
    }
  }
  handleRadioClick(data: any) {
    this.addForm.reset();
    if (data == 'new') {
      this.disableCustomerNumber = true;
      Object.keys(this.addForm.controls).forEach((key) => {
        if (key != 'customerName') {
          const control = this.addForm.controls[key];
          control.clearValidators();
          if (key == 'region' || key == 'currency') {
            control.setValue('');
          }
          control.updateValueAndValidity();
        }
      });
    } else {
      this.disableCustomerNumber = false;
      Object.keys(this.addForm.controls).forEach((key) => {
        if (key != 'customerName') {
          const control = this.addForm.controls[key];
          control.setValidators(Validators.required);
          if (key == 'customerPhoneNumber' || key == 'amount')
            control.setValidators([Validators.required, Validators.pattern("^[0-9]*$"), Validators.maxLength(10)]);
          if (key == 'accountNumber')
            control.setValidators([Validators.required, Validators.pattern("^[0-9]*$"), Validators.maxLength(15)]);
          if (key == 'bankName')
            control.setValidators([Validators.required, Validators.pattern('^[a-zA-Z ]*$'), Validators.maxLength(10)])
          if (key == 'region' || key == 'currency') {
            control.setValue('');
          }
          control.updateValueAndValidity();
        }
      });
    }
  }
  populateCustomerData() {
    if (this.addForm.value.customerNumber) {
      this.transactionService.getCustomerData(this.addForm.value.customerNumber).subscribe(res => {
        if (res?.data) {
          this.addForm.patchValue(res.data);
        } else {
          this.errorMsg = res?.message;
          this.customerNumber = this.addForm.value.customerNumber;
          this.addForm.reset();
          this.addForm.patchValue({ customerNumber: this.customerNumber });
          setTimeout(() => {
            this.errorMsg = '';
          }, 3000)
        }
      })
    }
  }
  regionHandler(event: any) {
    if (event.target.value == 'Port Mathurin') {
      this.hideAddress = true;
      this.addForm.controls['address'].clearValidators();
      this.addForm.controls['address'].updateValueAndValidity();
    } else {
      this.hideAddress = false;
      if (this.type == 'Existing') {
        this.addForm.controls['address'].setValidators(Validators.required);
        this.addForm.controls['address'].updateValueAndValidity();
      }
    }
  }
}
