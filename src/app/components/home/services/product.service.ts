import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductDetail } from '../../../Models/ProductDetail';
import { Observable } from 'rxjs';
import { UserData } from '../../../Models/UserData';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost:3001'; // Replace with your API URL
  
  constructor(private http :HttpClient) { }

  GetProducts( ): Observable<ProductDetail[]> {
    const url = `${this.apiUrl}/products`;
    return this.http.get<ProductDetail[]>(url , {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }) 
    });
  }

  GetProductByID( ID:number): Observable<ProductDetail> {
    const url = `${this.apiUrl}/getproduct`;
    return this.http.get<ProductDetail>(url , {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }) ,
      params: new HttpParams().set('ProductID', ID.toString())
    });
  }

  GetUsers(): Observable<UserData[]> {
    const url = `${this.apiUrl}/user`;
    return this.http.get<UserData[]>(url , {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }) 
    });
  }

}
