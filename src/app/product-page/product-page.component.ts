import { Component, effect, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ProductCardListComponent } from '../product-card-list/product-card-list.component';
import { ProductInquireComponent } from '../product-inquire/product-inquire.component';
import { Product } from '../model/product';
import { ProductService } from '../services/product.service';
import { PaginationComponent } from '../pagination/pagination.component';

@Component({
  selector: 'app-product-page',
  imports: [PaginationComponent, ProductCardListComponent, ProductInquireComponent],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss',
})
export class ProductPageComponent {
  private readonly router = inject(Router);

  private readonly productService = inject(ProductService);

  protected readonly pageIndex = signal(1);

  protected readonly pageSize = signal(5);

  protected readonly totalCount = signal(0);

  protected readonly products = signal<Product[]>([]);

  protected readonly searchQuery = signal('');

  constructor() {
    effect(() => {
      const pageIndex = this.pageIndex();
      const pageSize = this.pageSize();
      const searchQuery = this.searchQuery();
      this.getProducts(searchQuery, pageIndex, pageSize);
    });
  }

  onSearch(query: string): void {
    this.searchQuery.set(query);
    this.pageIndex.set(1);
  }

  onView(product: Product): void {
    this.router.navigate(['product', 'view', product.id]);
  }

  private getProducts(searchQuery: string, pageIndex: number, pageSize: number): void {
    this.productService.getList(searchQuery || undefined, pageIndex, pageSize).subscribe(({ data, count }) => {
      this.products.set(data);
      this.totalCount.set(count);
    });
  }
}
