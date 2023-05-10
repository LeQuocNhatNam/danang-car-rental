import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {RentalDetail} from "../model/rental-detail";
import {CartService} from "../service/cart.service";
import {ReservationDto} from "../model/reservation-dto";

@Component({
  selector: 'app-history-detail',
  templateUrl: './history-detail.component.html',
  styleUrls: ['./history-detail.component.css']
})
export class HistoryDetailComponent implements OnInit {

  VND = new Intl.NumberFormat();
  bookingDate?: string;
  cart?: RentalDetail[];
  reservationList?: ReservationDto[];
  totalAfterTax: number = 0;
  totalBeforeTax: number = 0;

  constructor(private activatedRoute: ActivatedRoute,
              private cartService: CartService
  ) {
  }

  ngOnInit(): void {
    debugger
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      debugger
      this.cartService.getHistory().subscribe(data => {
        debugger
        this.reservationList = data;
        const id = +parseInt(paramMap.get('id'));
        this.cart = this.reservationList[id].rentalDetailDTOList;
        const options = {day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'UTC'};
        this.bookingDate = new Date(this.reservationList[id].bookingDate).toLocaleDateString("vi-VN", options);

        if (this.cart == null) {
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
          this.cart[i].diffDays = diffInDays;
          this.totalBeforeTax += this.cart[i].totalPrice;
        }
        this.totalAfterTax = this.totalBeforeTax * 110 / 100;
      })
    })
  }

}
