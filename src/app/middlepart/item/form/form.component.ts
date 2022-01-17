import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {getItem} from "../../../domain/getItem";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit , OnChanges{
  @Input() item!:getItem;
  @Output() formOnSubmit = new EventEmitter<getItem>();

  onSubmit(form: FormGroup) {
    this.formOnSubmit.emit(form.value);
  }

  //add input.ng-dirty.ng-invalid to the css
  checkoutForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required, Validators.maxLength(255)]],
    price: ['', [Validators.required, Validators.min(0)]],
    currency: ['', [Validators.required]],
    amountStock: ['', [Validators.required, Validators.min(0)]],
  });

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    // changes.prop contains the old and the new value...
    console.log(`edit item ${this.item}`);
    this.checkoutForm.patchValue(this.item);
  }

  get description():string{
    return this.checkoutForm.value.description;
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
