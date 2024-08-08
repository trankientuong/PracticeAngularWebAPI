import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient: HttpClient) {}

  addCategory(categoryName: string, categoryUrlHandle: string) {
    return this.httpClient.post(`${environment.apiBaseUrl}/api/categories`, {
      name: categoryName,
      urlHandle: categoryUrlHandle
    })
  }

  getAllCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(`${environment.apiBaseUrl}/api/categories`);
  }

  getCategoryById(id: string): Observable<Category> {
    return this.httpClient.get<Category>(`${environment.apiBaseUrl}/api/categories/${id}`);
  }

  updateCategory(id: string, name: string, urlHandle: string): Observable<Category> {
    return this.httpClient.put<Category>(`${environment.apiBaseUrl}/api/categories/${id}`, {
      name: name,
      urlHandle: urlHandle
    });
  }

  deleteCategory(id: string): Observable<Category> {
    return this.httpClient.delete<Category>(`${environment.apiBaseUrl}/api/categories/${id}`);
  }
}
