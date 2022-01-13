import {Component, OnInit} from '@angular/core';
import {ItemService} from "../../../service/item.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {getItem} from "../../../domain/getItem";
import {Observable} from "rxjs";

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {
  //add input.ng-dirty.ng-invalid to the css
  checkoutForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required]],
    price: ['', [Validators.required, Validators.min(0)]],
    currency: ['', [Validators.required]],
    amountStock: ['', [Validators.required, Validators.min(0)]],
  });
  id!: string | null;
  item!: getItem;

  constructor(private itemService: ItemService,
              private formBuilder: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param:ParamMap) => this.id = param.get('id'));
    if(this.id !== null){
      this.itemService.getItem(this.id).subscribe({
          next: (item: getItem) => {
            this.checkoutForm.patchValue(item);
            this.item = item;
          },
          error: (err: Error) => console.log('get item by id has failed' + err),
          complete:()=> console.log('get item by id is completed')
        }
      )
    }
  }

  onSubmit() {
    if(this.id=== null)
    {
      this.itemService.addItem(this.checkoutForm.value)
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
    }else{
      //put function

    }
  }

  get nameErr(): FormControl {
    return this.checkoutForm.get('name') as FormControl;
  }

  get descriptionErr(): FormControl {
    return this.checkoutForm.get('description') as FormControl;
  }

  get priceErr(): FormControl {
    return this.checkoutForm.get('price') as FormControl;
  }

  get currencyErr(): FormControl {
    return this.checkoutForm.get('currency') as FormControl;
  }

  get amountStockErr(): FormControl {
    return this.checkoutForm.get('amountStock') as FormControl;
  }

}
