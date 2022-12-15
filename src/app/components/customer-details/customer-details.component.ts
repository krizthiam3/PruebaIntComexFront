import { Component, OnInit, Input } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { CustomerListComponent } from '../customer-list/customer-list.component';
import { Router, ActivatedRoute } from '@angular/router';
import { Customer } from 'src/app/entities/customer';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent {
  id: number = 0;
  customer: Customer = new Customer();

  constructor(private route: ActivatedRoute, private router: Router,
    public customerService: CustomerService) { }

    ngOnInit() {
      this.customer = new Customer();
  
      this.id = this.route.snapshot.params['id'];
      
      this.customerService.read(this.id)
        .subscribe(data => {
          console.log(data)
          this.customer = data;
        }, error => console.log(error));
    }
  
    list(){
      this.router.navigate(['customer']);
    }



}
