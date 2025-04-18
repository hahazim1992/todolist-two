import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  url = "https://my-app-r79i.onrender.com/customer";

  constructor(private httpClient: HttpClient) {}

  getCustomer() {
    return this.httpClient.get(this.url);
  }

  addCustomer(data: any) {
    return this.httpClient.post(this.url, data);
  }

  deleteCustomer(id: any) {
    return this.httpClient.delete(`${this.url}/${id}`);
  }

  updateCustomer(id: any, data: any) {
    return this.httpClient.put(`${this.url}/${id}`, data);
  }

  getSingleCustomer(id: any) {
    return this.httpClient.get(`${this.url}/${id}`);
  }
}
