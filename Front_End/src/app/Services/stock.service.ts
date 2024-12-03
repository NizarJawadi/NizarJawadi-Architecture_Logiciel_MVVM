import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Stock {
  id?: number;
  dateDepot: string;
  typeOperation: string;
  quantite: number;
}

@Injectable({
  providedIn: 'root',
})
export class StockService {
  private apiUrl = 'http://localhost:8080/api/stocks';

  constructor(private http: HttpClient) {}

  getStocks(): Observable<Stock[]> {
    return this.http.get<Stock[]>(this.apiUrl);
  }

  createStock(stock: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, stock);
  }
  

  updateStock(id: number, stock: Stock): Observable<Stock> {
    return this.http.put<Stock>(`${this.apiUrl}/${id}`, stock);
  }

  deleteStock(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
