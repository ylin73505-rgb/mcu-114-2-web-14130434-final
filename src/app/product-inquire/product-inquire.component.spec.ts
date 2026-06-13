import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductInquireComponent } from './product-inquire.component';

describe('ProductInquireComponent', () => {
  let component: ProductInquireComponent;
  let fixture: ComponentFixture<ProductInquireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductInquireComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductInquireComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
