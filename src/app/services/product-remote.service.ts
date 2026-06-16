import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

import { Product } from '../model/product';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root',
})
export class ProductRemoteService extends ProductService {
  private readonly url = 'http://localhost:3000/products';

  private readonly httpClient = inject(HttpClient);

  override getList(name: string | undefined, index: number, size: number): Observable<{ data: Product[]; count: number }> {
    return this.httpClient.get<Product[]>(this.url).pipe(
      map((data) => {
        const filtered = name ? data.filter((item) => item.name.toLowerCase().includes(name.toLowerCase())) : data;
        const startIndex = (index - 1) * size;
        const endIndex = startIndex + size;

        return {
          data: filtered.slice(startIndex, endIndex),
          count: filtered.length,
        };
      })
    );
  }

  override getById(productId: number): Observable<Product> {
    return this.httpClient.get<Product>(`${this.url}/${productId}`);
  }
}
