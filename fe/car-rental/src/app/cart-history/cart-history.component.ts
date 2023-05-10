import {Component, OnInit} from '@angular/core';
import {CartService} from "../service/cart.service";
import {ReservationDto} from "../model/reservation-dto";
import {RentalDetail} from "../model/rental-detail";
import {Router} from "@angular/router";

@Component({
  selector: 'app-cart-history',
  templateUrl: './cart-history.component.html',
  styleUrls: ['./cart-history.component.css']
})
export class CartHistoryComponent implements OnInit {

  cart?: RentalDetail[];
  message?: string;
  reservationDTOList?: ReservationDto[];
  VND = new Intl.NumberFormat();

  constructor(private cartService: CartService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.cartService.getHistory().subscribe(data => {
      this.reservationDTOList = data;
      console.log(this.reservationDTOList);
    })

  }

  viewDetail(id: number) {
    this.router.navigateByUrl("/history-detail/" + id);
  }
}
