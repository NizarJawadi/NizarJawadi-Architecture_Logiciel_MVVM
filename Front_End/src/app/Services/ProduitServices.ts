import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produit } from '../../Model/Produit';
import { StockService } from './stock.service';
import { FormBuilder } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ProduitServices {
  private apiUrl = 'http://localhost:8080/api/produits';


  constructor(private http: HttpClient ) {}

  getProduits(): Observable<Produit[]> {
    return this.http.get<Produit[]>(this.apiUrl);
  }

  getProduitById(id: number): Observable<Produit> {
    return this.http.get<Produit>(`${this.apiUrl}/${id}`);
  }

  createProduit(produit: Produit): Observable<Produit> {
    return this.http.post<Produit>(this.apiUrl, produit);
  }

  searchProduct(searchValue: string): Observable<Produit[]> {
    const params = new HttpParams().set('searchValue',searchValue);
    return this.http.get<Produit[]>(`${this.apiUrl}/search`, { params })
  }
  public deleteProduct(id: number):Observable<Produit>{
    return this.http.delete<Produit>(`${this.apiUrl}/${id}`);
  }



}
