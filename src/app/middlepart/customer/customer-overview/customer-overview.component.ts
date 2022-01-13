import { Component, OnInit } from '@angular/core';
import {CustomerService} from "../../../service/customer.service";

@Component({
  selector: 'app-customer-overview',
  templateUrl: './customer-overview.component.html',
  styleUrls: ['./customer-overview.component.css']
})
export class CustomerOverviewComponent implements OnInit {

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.loadCustomers();
  }

  private loadCustomers() {
    this.customerService.getItems().subscribe()
  }
}
