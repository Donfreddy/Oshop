import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Product } from './models/product';
import 'rxjs/add/operator/map';
import { ShoppingCart } from './shopping-cart';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCardService {

  constructor(private db: AngularFireDatabase) { }

  private create() {
    return this.db.list('/shopping-cart').push({
      dateCreated: new Date().getTime()
    });
  }

  async getCart(): Promise<AngularFireObject<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-cart/' + cartId);
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-cart/' + cartId + '/items/' + productId);
  }

  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  async addToCart(product: Product) {
   this.updateItemQty(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateItemQty(product, -1);
  }

  async updateItemQty(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId();
    let item$$ = this.getItem(cartId, product.key);
    let item$: Observable<any> = this.getItem(cartId, product.key).valueChanges();
    
    item$.take(1).subscribe(item => {
      if (item) {
        item$$.update({ quantity: item.quantity + change });
      } else {
          item$$.set({ product: product, quantity: change });
        }
      });
  }
}
