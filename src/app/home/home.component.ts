import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  mockJsonAdd = {
    "name": "kitty",
    "gender": "male",
    "dob": "02/02/2000"
  }

  mockJsonUpdate = {
    "name": "Mossy",
    "gender": "female",
    "dob": "03/03/3000"
  }

  customer: any;
  singleCustomer: any;

  constructor( private customerService: CustomerService, private router: Router ) { }

  ngOnInit(): void {
    this.getCustomer();
  }

  getCustomer() {
    this.customerService.getCustomer().subscribe((x) => this.customer = x);
  }
  
  addCustomer(data: any) {
    this.customerService.addCustomer(data).subscribe(() => {
      this.getCustomer(); // Refresh the list after adding
    });
  }

  deleteCustomer(id: any) {
    this.customerService.deleteCustomer(id).subscribe(() => {
      this.getCustomer(); // Refresh the list after deleting
    });
  }

  //quick add cust
  onAdd(data: any) {
    this.addCustomer(data);
  }

  onDelete(id: any) {
    this.deleteCustomer(id);
  }


}
