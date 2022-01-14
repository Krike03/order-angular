import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {OverviewComponent} from "./middlepart/item/overview/overview.component";
import {AddItemComponent} from "./middlepart/item/add-item/add-item.component";
import {DetailComponent} from "./middlepart/item/detail/detail.component";
import {EditItemComponent} from "./middlepart/item/edit-item/edit-item.component";

const routes: Routes = [

  {
    path: 'items', children: [
      {path: '', component: OverviewComponent},
      {path: 'add-item', component: AddItemComponent},
      {path: ':id', component: DetailComponent},
      {path: 'edit/:id', component:EditItemComponent},
    ]
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
