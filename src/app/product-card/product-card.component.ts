import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCardService } from '../shopping-card.service';
import { ShoppingCartComponent } from '../shopping-cart/shopping-cart.component';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input('product') product: Product;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart;

  constructor(private cartService: ShoppingCardService) { }

  ngOnInit() {
  }

  addToCart() {
    this.cartService.addToCart(this.product);
  }

  getQty() {
    if (!this.shoppingCart) return 0;

    let item = this.shoppingCart.items[this.product.key]
    return item ? item.quantity : 0;
  }
  
  removeFromCart() {
    this.cartService.removeFromCart(this.product);
  }
}