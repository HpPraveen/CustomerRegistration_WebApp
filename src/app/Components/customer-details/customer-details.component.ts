import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/Models/Customer';
import { CustomerService } from 'src/app/Services/CustomerService';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent implements OnInit {

  constructor(public customerService: CustomerService, private toastr: ToastrService) { }

  ngOnInit(): void {
    debugger
    this.customerService.GetAllCustomers();
  }

  selectOption(id: number) {
    console.log(id);
  }

  onSubmit(form: NgForm) {
    debugger
    if (this.customerService.formData.id == 0)
      this.insertRecord(form);
    else
      this.updateRecord(form);
  }

  insertRecord(form: NgForm) {
    this.customerService.CreateCustomer().subscribe(
      res => {
        this.resetForm(form);
        this.customerService.RefreshCustomerList();
        this.toastr.success("Customer inserted successfully !");
      },
      err => { console.log(err); }
    );
  }

  updateRecord(form: NgForm) {
    this.customerService.UpdateCustomer().subscribe(
      res => {
        this.resetForm(form);
        this.customerService.RefreshCustomerList();
        this.toastr.success("Customer updated successfully !");
      },
      err => { console.log(err); }
    );
  }

  resetForm(form: NgForm) {
    form.form.reset();
    this.customerService.formData = new Customer();
  }

  clear(){
    window.location.reload();
  }

}
