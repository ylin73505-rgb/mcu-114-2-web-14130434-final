import { CurrencyPipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../model/product';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-product-detail-page',
  imports: [CurrencyPipe],
  templateUrl: './product-detail-page.component.html',
  styleUrl: './product-detail-page.component.scss',
})
export class ProductDetailPageComponent {
  readonly product = input.required<Product>();

  private readonly router = inject(Router);

  private readonly cartService = inject(CartService);

  onAddToCart(): void {
    this.cartService.add(this.product());
  }

  onBack(): void {
    this.router.navigate(['products']);
  }
}
