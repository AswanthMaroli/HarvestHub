import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SaveResponse } from '../../../Models/SaveResponse';
import { Registration } from '../Models/Registration';
import { Cart } from '../Models/cart';
import { Customer } from '../../checkout/model/Customer';

@Injectable({
  providedIn: 'root'
})
export class ProductRegistrationService {

  private apiUrl = 'http://localhost:3001';
  
  constructor(private http :HttpClient) { }

  
  // Method to post data to the API
  SaveRegistration( data: Registration): Observable<SaveResponse> {
    const url = `${this.apiUrl}/saveRegistration`;
    return this.http.post<SaveResponse>(url, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }) 
    });
  }

  SaveCustomer( data: Customer): Observable<SaveResponse> {
    const url = `${this.apiUrl}/saveCustomer`;
    return this.http.post<SaveResponse>(url, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }) 
    });
  }

  GetProductByRegID( ID:number): Observable<Registration[]> {
    const url = `${this.apiUrl}/productsbyregid`;
    return this.http.get<Registration[]>(url , {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }) ,
      params: new HttpParams().set('ProductRegID', ID.toString())
    });
  }

  GetCart( ID:number): Observable<Cart[]> {
    const url = `${this.apiUrl}/getcart`;
    return this.http.get<Cart[]>(url , {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }) ,
      params: new HttpParams().set('UserID', ID.toString())
    });
  }
}
