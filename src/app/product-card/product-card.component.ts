import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output, booleanAttribute, numberAttribute } from '@angular/core';

@Component({
  selector: 'app-product-card',
  imports: [DatePipe, CurrencyPipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  @Input({ required: true, transform: numberAttribute })
  id!: number;

  @Input()
  productName!: string;

  @Input()
  author!: string;

  @Input()
  company!: string;

  @Input()
  photoUrl!: string;

  @Input()
  createDate!: Date;

  @Input({ transform: numberAttribute })
  price!: number;
}
