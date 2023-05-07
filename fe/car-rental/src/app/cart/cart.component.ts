import {Component, OnInit} from '@angular/core';
import {CartService} from "../service/cart.service";
import {RentalDetail} from "../model/rental-detail";
import {forEachComment} from "tslint";
import {Router} from "@angular/router";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart?: RentalDetail[];
  VND = new Intl.NumberFormat();
  totalBeforeTax: number = 0;
  totalAfterTax: number = 0;

  constructor(private cartService: CartService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getCart();
  }

  deleteCartItem(id: number) {
    this.cartService.deleteCartItem(id).subscribe(() => {
      this.getCart();
    })
  };

  getCart() {
    this.cartService.getCart().subscribe(data => {
      const options = {day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'UTC'};
      this.cart = data;
      for (let i = 0; i < this.cart.length; i++) {
        const pickupDate = new Date(this.cart[i].pickupDate);
        const returnDate = new Date(this.cart[i].returnDate);
        this.cart[i].pickupDate = pickupDate.toLocaleDateString("vi-VN", options);
        this.cart[i].returnDate = returnDate.toLocaleDateString("vi-VN", options);
        const diffInMs: number = Math.abs(returnDate.getTime() - pickupDate.getTime());
        const diffInDays: number = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
        this.cart[i].totalPrice = this.cart[i].imageList[0].car.price * diffInDays;
        this.totalBeforeTax += this.cart[i].totalPrice;
      }
      this.totalAfterTax = this.totalBeforeTax * 110 / 100;
    })
  }

}
