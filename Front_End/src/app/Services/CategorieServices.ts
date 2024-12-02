import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategorieService {
  private apiUrl = 'http://localhost:8080/categories'; // Remplacez par votre API

  constructor(private http: HttpClient) {}

  getCategories(): Observable<{ id: number; nom: string }[]> {
    return this.http.get<{ id: number; nom: string }[]>(this.apiUrl);
  }

  addCategorie(categorie: { nom: string }): Observable<{ id: number; nom: string }> {
    return this.http.post<{ id: number; nom: string }>(this.apiUrl, categorie);
  }

  deleteCategorie(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
