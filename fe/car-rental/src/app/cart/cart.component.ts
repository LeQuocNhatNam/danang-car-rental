import {Component, OnInit} from '@angular/core';
import {CartService} from "../service/cart.service";
import {RentalDetail} from "../model/rental-detail";
import {forEachComment} from "tslint";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {render} from "creditcardpayments/creditCardPayments";
import {TokenStorageService} from "../security-authentication/service/token-storage.service";

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
  message: string;
  private usdPayment: string;

  constructor(private cartService: CartService,
              private router: Router,
              private tokenStorageService: TokenStorageService) {
  }

  ngOnInit(): void {
    if (!this.tokenStorageService.getToken()) {
      Swal.fire({
        icon: "warning",
        iconColor: 'darkorange',
        confirmButtonText: "OK.",
        confirmButtonColor: "darkorange",
        title: "Vui lòng đăng nhập trước"
      })
      this.router.navigateByUrl("/");
      return;
    }
    this.getCart();
  }

  deleteCartItem(id: number) {
    this.cartService.deleteCartItem(id).subscribe(() => {
      this.getCart();
    })
  };

  getCart() {
    this.cartService.getCart().subscribe(data => {
      debugger
      this.cart = data;
      const options = {day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'UTC'};
      if (this.cart == null) {
        this.message = "Chưa có mục nào trong giỏ hàng"
        return;
      }
      for (let i = 0; i < this.cart.length; i++) {
        const pickupDate = new Date(this.cart[i].pickupDate);
        const returnDate = new Date(this.cart[i].returnDate);
        this.cart[i].pickupDate = pickupDate.toLocaleDateString("vi-VN", options);
        this.cart[i].returnDate = returnDate.toLocaleDateString("vi-VN", options);
        const diffInMs: number = Math.abs(returnDate.getTime() - pickupDate.getTime());
        const diffInDays: number = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
        this.cart[i].totalPrice = this.cart[i].imageList[0].car.price * diffInDays;
        this.totalBeforeTax += this.cart[i].totalPrice;
        this.cart[i].diffDays = diffInDays;
      }
      this.totalAfterTax = this.totalBeforeTax * 110 / 100;
      this.usdPayment = Math.round(this.totalAfterTax / 23000 * 100) / 100 + '';

    })
  }

  onPayment() {
    document.querySelector('#myPaypal').innerHTML = '';
    render(
      {
        id: "#myPaypal",
        currency: "USD",
        value: '' + this.usdPayment,
        onApprove: (details => {
          this.cartService.completePayment(this.totalAfterTax).subscribe(() => {
            Swal.fire({
              icon: "success",
              iconColor: 'darkorange',
              confirmButtonText: "OK",
              confirmButtonColor: "darkorange",
              title: "Xin chúc mừng",
              text: "Bạn đã thanh toán thành công, chúc bạn có chuyến đi vui vẻ"
            });
            document.getElementById("modal-payment-btn").click();
            this.router.navigateByUrl("/");
          })
        })
      }
    )
  }
}
