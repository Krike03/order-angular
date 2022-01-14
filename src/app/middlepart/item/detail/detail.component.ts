import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {ItemService} from "../../../service/item.service";
import {getItem} from "../../../domain/getItem";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  id!:string | null;
  item$!: getItem;

  constructor(private itemService: ItemService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    // this.activatedRoute.paramMap.subscribe((param:ParamMap) => this.id = param.get('id'));
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
