import { Component } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { Router } from '@angular/router';
import { Customer } from 'src/app/entities/customer';

import { ContactoService } from 'src/app/services/contacto.service';
import { Contacto } from 'src/app/entities/contacto';

import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';


@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.css']
})
export class CustomerCreateComponent {
  customer = new Customer();
  submitted = false;

  contactos: any  ;  
  selectedCountry! : number; 
  myForm = new FormGroup({
    usuario: new FormControl('', [Validators.required, Validators.minLength(3)]),
    nombreCompleto: new FormControl('', [Validators.required, Validators.minLength(3)]),
    cargo: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    codTipoContacto: new FormControl('', [Validators.required, Validators.nullValidator]),
  });

  constructor(private customerService: CustomerService, 
    private contactoService: ContactoService, 
    private formBuilder: FormBuilder,
    private router: Router) { 
      this.contactoService.readAll().subscribe(data => this.contactos = data,  
        error => console.log(error),  
        () => console.log('Get all complete'));  
    }
    

  ngOnInit(): void {}
    
  createCustomer(): void {
    
    const customer = {
      usuario: this.customer.usuario,
      nombreCompleto: this.customer.nombreCompleto,
      cargo: this.customer.cargo,
      email: this.customer.email,
      codTipoContacto: this.selectedCountry,
    };

    this.customerService.create(customer)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
          this.gotoList();
        },
        error => {
          console.log(error);
        });
  }

  newCustomer(): void {
    this.submitted = false;
    this.customer = new Customer();
  }

  get f(){
    return this.myForm.controls;
  }
  
  onSubmit(): void {
    this.submitted = true;

    /* if (this.form.invalid) {
      return;
    }*/

    this.createCustomer();    
  }

  gotoList() {
    this.router.navigate(['/customer']);
  }
}
