import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AppUser } from '../models/app-user';
import { ShoppingCardService } from '../shopping-card.service';
import { Observable } from 'rxjs';
import { ShoppingCart } from '../shopping-cart';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  appUser: AppUser;
  cart$: Observable<ShoppingCart>;

  shoppingCartItemCount: number;

  constructor(private auth: AuthService, private shoppingCartService: ShoppingCardService) { }

  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);

    this.cart$ = await (await this.shoppingCartService.getCart()).valueChanges();
    this.cart$.subscribe(cart => {
      this.shoppingCartItemCount = 0;
      for (let productId in cart.items) 
        this.shoppingCartItemCount += cart.items[productId].quantity;
    })
  }

  logout() {
    this.auth.logout();
  }

}
