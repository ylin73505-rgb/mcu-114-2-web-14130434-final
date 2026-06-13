import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { ProductInquireComponent } from './product-inquire/product-inquire.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, ProductInquireComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class App {}
