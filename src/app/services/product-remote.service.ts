import { HttpClient, HttpParams } from '@angular/common/http';
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

  override getById(productId: string): Observable<Product> {
    const url = `${this.url}/${productId}`;
    return this.httpClient.get<Product>(url);
  }

  override getList(name: string | undefined, index: number, size: number): Observable<{ data: Product[]; count: number }> {
    const params = new HttpParams({ fromObject: { _page: 1, _per_page: 1000 } });

    return this.httpClient.get<{ data: Product[] }>(this.url, { params }).pipe(
      map(({ data }) => {
        const filteredData = this.filterProducts(data, name);
        const startIndex = (index - 1) * size;
        const endIndex = startIndex + size;

        return { data: filteredData.slice(startIndex, endIndex), count: filteredData.length };
      }),
    );
  }

  private filterProducts(data: Product[], name: string | undefined): Product[] {
    if (!name) return data;

    const query = name.toLowerCase();
    return data.filter((item) =>
      [item.id, item.name, item.company, ...item.authors].some((value) => value.toLowerCase().includes(query)),
    );
  }
}
