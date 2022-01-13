import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {CustomerOverviewComponent} from "./customer-overview/customer-overview.component";

const routes: Routes =[
  {path: 'customers' , children:[
      {path:'', component: CustomerOverviewComponent}
    ]},
]

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes) ]
})
export class CustomerRoutingModule { }
