import { Component } from '@angular/core';
import { output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-inquire',
  imports: [FormsModule],
  templateUrl: './product-inquire.component.html',
  styleUrl: './product-inquire.component.scss',
})
export class ProductInquireComponent {
  searchQuery: string = '';

  readonly search = output<string>();

  onSearch(): void {
    this.search.emit(this.searchQuery.trim());
  }
}
