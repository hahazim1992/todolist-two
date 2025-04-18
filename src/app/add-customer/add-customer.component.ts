import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent implements OnInit {

  customer: any;
  singleCustomer: any;
  buttonLabel = "add";

  formCustomer = this.fb.group({
    name: [''],
    gender: [''],
    dob: ['']
  })

  constructor(private customerService: CustomerService, private fb: FormBuilder, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    if(this.activatedRoute.snapshot.url[0].path == "edit") {
      this.buttonLabel = "edit"
      this.getSingleCustomer(this.activatedRoute.snapshot.url[1].path);
    }
  }

  getSingleCustomer(id: any) {
    this.customerService.getSingleCustomer(id).subscribe((x) => {
      this.singleCustomer = x;
      this.formCustomer.controls["name"].setValue(this.singleCustomer.name);
      this.formCustomer.controls["gender"].setValue(this.singleCustomer.gender);
      this.formCustomer.controls["dob"].setValue(this.singleCustomer.dob);
    });
  }

  addCustomer(data: any) {
    this.customerService.addCustomer(data).subscribe((x) => this.customer.push(x));
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 500);
  }

  updateCustomer(id: any, data: any) {
    this.customerService.updateCustomer(id, data).subscribe((x) => {
      this.customer = x;
      setTimeout(() => {
        this.router.navigate(['/']);
      }, 500);
    });
  }

  onSubmit(data: any) {
    if (this.activatedRoute.snapshot.url[0].path == "add") {
      this.addCustomer(data);
    }
    else {
      this.updateCustomer(this.activatedRoute.snapshot.url[1].path, data);
    }  
  }
}
