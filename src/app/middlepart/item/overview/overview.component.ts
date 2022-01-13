import { Component, OnInit } from '@angular/core';
import {ItemService} from "../../../service/item.service";
import {getItem} from "../../../domain/getItem";
import {debounceTime, distinctUntilChanged, Observable, Subject, switchMap} from "rxjs";

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  items: getItem[] = [];
  private searchTerms = new Subject<string>();
  searchItems$!: Observable<getItem[]>;

  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
    console.log('1');
    this.getItems();
    console.log('2');

    this.searchItems$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term:string) => this.itemService.searchItem(term))
    );
    console.log('3');

  }

  getItems(): void{
    console.log('getItems');
    this.itemService.items.subscribe(
      items => this.items = items);
  }

  search(term:string){
    this.searchTerms.next(term);
  }
}
