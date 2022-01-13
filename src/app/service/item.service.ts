import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, of, tap} from "rxjs";
import {getItem} from "../domain/getItem";

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private url = `${environment.baseUrl}/items`;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  constructor(private httpClient: HttpClient) { }

  get items(): Observable<getItem[]>{
    console.log(this.url);
    return this.httpClient.get<getItem[]>(this.url);
  }

  searchItem(term:string): Observable<getItem[]>{
      if(!term.trim()){
        return of([]);
      }
      return this.httpClient.get<getItem[]>(`${this.url}/?${term}`);
  }

  addItem(item: getItem): Observable<number> {
    return this.httpClient.post<number>(this.url, item, this.httpOptions)
      .pipe(
        tap((newItem:number) => console.log(`new item is added:${newItem}`)),
        catchError(this.handleError<number>('addItem'))
      );
  }

  getItem(id: string): Observable<getItem> {
    return this.httpClient.get<getItem>(`${this.url}/${id}`).pipe(
      tap((newItem:getItem )=> console.log(`Item whit id: ${id} is ${newItem}`)),
      catchError(this.handleError<getItem>('get Item'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
