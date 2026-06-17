import { Injectable, computed, signal } from '@angular/core';

import { Product } from '../model/product';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly itemsSignal = signal<CartItem[]>([]);

  readonly items = this.itemsSignal.asReadonly();

  readonly itemTypes = computed(() => this.itemsSignal().length);

  readonly totalQuantity = computed(() => this.itemsSignal().reduce((total, item) => total + item.quantity, 0));

  readonly totalAmount = computed(() =>
    this.itemsSignal().reduce((total, item) => total + item.product.price * item.quantity, 0),
  );

  add(product: Product): void {
    this.itemsSignal.update((items) => {
      const existingItem = items.find((item) => item.product.id === product.id);

      if (existingItem) {
        return items.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }

      return [...items, { product, quantity: 1 }];
    });
  }

  updateQuantity(productId: string, quantity: number): void {
    const nextQuantity = Math.max(0, Math.floor(quantity || 0));

    this.itemsSignal.update((items) => {
      if (nextQuantity === 0) {
        return items.filter((item) => item.product.id !== productId);
      }

      return items.map((item) => (item.product.id === productId ? { ...item, quantity: nextQuantity } : item));
    });
  }

  remove(productId: string): void {
    this.itemsSignal.update((items) => items.filter((item) => item.product.id !== productId));
  }
}
