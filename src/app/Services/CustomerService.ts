import { Injectable } from '@angular/core';
import { Customer } from '../Models/Customer';
import { HttpClient } from "@angular/common/http";
import { UrlsConfig } from '../Shared/UrlConfig';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  readonly baseURL = UrlsConfig.rootUrl;
  formData: Customer = new Customer();
  customerList: Customer[] = [];

  constructor(private http: HttpClient) { }

  GetAllCustomers() {
    return this.http.get<Customer[]>(this.baseURL);
  }

  GetAllCustomersByPaging(pageNumber: number, pageSize: number, name: string) {
    return this.http.get(`${this.baseURL}/${pageNumber}/${pageSize}/${name}`);
  }

  GetCustomer(customerId: number) {
    return this.http.get(`${this.baseURL}/${customerId}`);
  }

  SearchCustomers(name: string) {
    debugger
    this.http.get(`${this.baseURL}/${name}`)
      .toPromise()
      .then(res =>this.customerList = res as Customer[]);
  }

  CreateCustomer() {
    debugger
    return this.http.post(this.baseURL, this.formData);
  }

  UpdateCustomer() {
    return this.http.put(this.baseURL, this.formData);
  }

  DeleteCustomer(customerId: number) {
    return this.http.delete(`${this.baseURL}/${customerId}`);
  }

  RefreshCustomerList() {
    this.http.get(this.baseURL)
      .toPromise()
      .then(res =>this.customerList = res as Customer[]);
  }
}
