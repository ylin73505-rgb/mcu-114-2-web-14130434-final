import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-inquire',
  imports: [FormsModule],
  templateUrl: './product-inquire.component.html',
  styleUrl: './product-inquire.component.scss',
})
export class ProductInquireComponent {
  searchQuery: string = '';

  onSearch(): void {
    if (this.searchQuery.trim()) {
      console.log('搜尋產品:', this.searchQuery);
    }
  }
}
