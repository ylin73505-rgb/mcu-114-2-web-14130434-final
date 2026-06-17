import { CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-login-page',
  imports: [CurrencyPipe, FormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  constructor(protected readonly cartService: CartService) {}

  onQuantityChange(productId: string, value: string): void {
    this.cartService.updateQuantity(productId, Number(value));
  }

  onSubmit(form: NgForm): void {
    if (form.invalid || this.cartService.itemTypes() === 0) {
      form.control.markAllAsTouched();
      return;
    }

    this.cartService.clear();
    form.resetForm();
  }
}
