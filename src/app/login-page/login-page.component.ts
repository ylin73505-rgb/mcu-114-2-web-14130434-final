import { CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-login-page',
  imports: [CurrencyPipe],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  constructor(protected readonly cartService: CartService) {}

  onQuantityChange(productId: string, value: string): void {
    this.cartService.updateQuantity(productId, Number(value));
  }
}
