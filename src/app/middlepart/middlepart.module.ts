import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OverviewComponent} from './item/overview/overview.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {AddItemComponent} from './item/add-item/add-item.component';
import {DetailComponent} from './item/detail/detail.component';
import {CustomerModule} from "./customer/customer.module";
import {FormComponent} from './item/form/form.component';
import { EditItemComponent } from './item/edit-item/edit-item.component';

@NgModule({
  declarations: [
    OverviewComponent,
    AddItemComponent,
    DetailComponent,
    FormComponent,
    EditItemComponent
  ],
  exports: [
    OverviewComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    CustomerModule
  ]
})
export class MiddlepartModule {
}
