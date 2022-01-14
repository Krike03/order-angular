import {Component, OnInit} from '@angular/core';
import {ItemService} from "../../../service/item.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {getItem} from "../../../domain/getItem";

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  id!: string | null;
  item!: getItem;

  constructor(private itemService: ItemService,
              private router: Router
              ) {
  }

  ngOnInit(): void {

  }

  onSubmit(item:getItem) {
    this.itemService.addItem(item)
      .subscribe({
        next: (id: number) => {
          console.log('Observer got a next value: '),
            this.router.navigate([`items/${id}`])
        },
        error: (err: Error) => console.error('Observer got an error: ' + err),
        complete: () => {
          console.log('Observer got a complete notification')
        }
      });
  }



}
