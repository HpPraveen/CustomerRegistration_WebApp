import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/Models/Customer';
import { CustomerService } from 'src/app/Services/CustomerService';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {
  customerList: Customer[] = [];
  constructor(public customerService: CustomerService, private toastr: ToastrService) { }

  ngOnInit(): void {
    debugger
   this.customerService.RefreshCustomerList();
  }

  populateForm(selectedRecord: Customer) {
    this.customerService.formData = Object.assign({}, selectedRecord);
  }

  onDelete(id: number) {
    debugger
    if (confirm('Are you sure to delete this customer?')) {
      this.customerService.DeleteCustomer(id)
        .subscribe(
          res => {
            this.customerService.RefreshCustomerList();
            this.toastr.error("Customer deleted successfully!");
          },
          err => { console.log(err) }
        )
    }
  }

  search(){
    var searchTxt = ((document.getElementById("searchTxt") as HTMLInputElement).value);
    this.customerService.SearchCustomers(searchTxt);
  }

}
