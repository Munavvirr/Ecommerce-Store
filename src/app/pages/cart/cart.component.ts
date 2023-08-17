import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { Cart, CartItem } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit {
  ngOnInit(): void {
    this.cartService.cart.subscribe((_cart: Cart)=>{
      this.cart = _cart
      this.dataSource = this.cart.items
    })
  }
  constructor(private cartService: CartService, private http: HttpClient){}
  cart: Cart = {items: [{
    product: 'https://via.placeholder.com/150',
    name: 'snickers',
    price: 150,
    quantity: 1,
    id: 1 
  },
  {
    product: 'https://via.placeholder.com/150',
    name: 'kitkat',
    price: 250,
    quantity: 2,
    id: 2 
  }]}
  dataSource: Array<CartItem> = []
  displayedColumns: Array<string> = [
    'product',
    'name',
    'price',
    'quantity',
    'total',
    'action'
  ]
  getTotal(items: Array<CartItem>): number{
    return this.cartService.getTotal(items)
  }
  onClearCart(): void{
    this.cartService.clearCart()
  }
  onRemoveFromCart(item: CartItem): void{
    this.cartService.removeFromCart(item)
  }
  onAddQuantity(item: CartItem): void{
    this.cartService.addToCart(item)
  }
  onRemoveQuantity(item: CartItem): void{
    this.cartService.removeQuantity(item)
  }
  onCheckOut(): void{
    this.http.post('https://localhost:4200/checkout', {
      items: this.cart.items
    }).subscribe(async(res: any)=>{
      let stripe = await loadStripe('pk_test_51NBGZIHQ2HgMWU8nqwrxMZjxUtPWyuzfbIOi6oJL6aTQyP88sABlKlP6aVvVRDD3q1uLZIJ3oqZCUUHtZ3w71DKU00fYH8jVJ4')
      stripe?.redirectToCheckout({
        sessionId: res.Id
      })
    })
  }

}
