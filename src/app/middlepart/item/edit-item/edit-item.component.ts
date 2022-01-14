import { Component, OnInit } from '@angular/core';
import {getItem} from "../../../domain/getItem";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {ItemService} from "../../../service/item.service";
import {FormGroup} from "@angular/forms";
import {flatMap, tap} from "rxjs";

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {

  id!: string;
  item$!: getItem;

  constructor(private itemService: ItemService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.item$ = history.state.data;

    if(this.item$ === undefined) {
      let id = this.activatedRoute.snapshot.paramMap.get('id');
      if(id !== null){
        this.id = id;
        this.itemService.getItem(this.id).subscribe({
            next: (item: getItem) => {
              // this.checkoutForm.patchValue(item);
              this.item$ = item;
            },
            error: (err: Error) => console.log('get item by id has failed' + err),
            complete:()=> console.log('get item by id is completed')
          }
        )
      }else{
        console.log('empty Id');
      }
    }
  }

  onSubmit(item: getItem){
    this.itemService.editItem(this.id, item )
      .subscribe({
        next: (item: getItem) => this.router.navigate([`items/${item.id}`])
      })
  }

}
