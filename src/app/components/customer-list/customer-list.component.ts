import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent {

  customers: any;
  currentCustomer = null;
  currentIndex = -1;
  name = '';

  constructor(private customerService: CustomerService,
    private router: Router) { }

  ngOnInit(): void {
    this.readCustomers();
  }

  readCustomers(): void {
    this.customerService.readAll()
      .subscribe(
        
        customers => {
          this.customers = customers;

          console.log(customers);
        },
        error => {
          console.log(error);
        });
  }

  refresh(): void {
    this.readCustomers();
    this.currentCustomer = null;
    this.currentIndex = -1;
  }

  customerDetails(id: number){
    this.router.navigate(['customer', id]);
  }

}
