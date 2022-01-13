import { Injectable, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Customer} from "../domain/customer";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class CustomerService implements OnInit{
  private url!: string;

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void{
    this.url = `${environment.baseUrl}/customers`;
  }

  getItems(): Observable<Customer>{
    return this.httpClient.get<Customer>(this.url);
  }
}
