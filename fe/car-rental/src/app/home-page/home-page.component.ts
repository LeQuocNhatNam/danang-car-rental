import {Component, OnInit} from '@angular/core';
import {CarDTO} from "../model/car-dto";
import {CarService} from "../service/car.service";
import {tokenReference} from "@angular/compiler";
import {TokenStorageService} from "../security-authentication/service/token-storage.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {CartService} from "../service/cart.service";
import {RentalDetail} from "../model/rental-detail";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  carDTOList?: CarDTO[];
  page = 0;
  model = "";
  VND = new Intl.NumberFormat();
  pageCount = 0;
  message?: string;
  pickupDate?: string;
  returnDate?: string;

  constructor(private carService: CarService,
              private tokenStorageService: TokenStorageService,
              private router: Router,
              private cartService: CartService) {
  }

  ngOnInit(): void {
    this.findAllCars();
  }

  searchCarsByDate(pickupDate: string, returnDate: string) {
    this.pickupDate = pickupDate;
    this.returnDate = returnDate;
    this.carService.searchCarsByDate(this.page, this.model, this.pickupDate, this.returnDate).subscribe(data => {
      this.carDTOList = data;
      if (data == null) {
        this.message = "Danh sách trống!"
      } else {
        this.message = null;
      }
      this.carDTOList = data?.content;
      this.pageCount = data?.totalPages;
    });
  }

  findAllCars() {
    this.carService.findAllCar(this.page, this.model).subscribe(data => {
      this.carDTOList = data;
      if (data == null) {
        this.message = "Danh sách trống!"
      } else {
        this.message = null;
      }
      this.carDTOList = data?.content;
      this.pageCount = data?.totalPages;
    })
  }

  goPrevious() {
    this.page--;
    this.findAllCars();
  }

  goNext() {
    this.page++;
    this.findAllCars();
  }

  first() {
    this.page = 0;
    this.findAllCars();
  }

  last() {
    this.page = this.pageCount - 1;
    this.findAllCars();
  }

  searchCars(model: string) {
    this.model = model;
    if (this.returnDate == undefined || this.pickupDate == undefined) {
      this.findAllCars();
    } else {
      this.searchCarsByDate(this.pickupDate, this.returnDate);
    }
  }

  addToCart(id: number) {
    if (!this.tokenStorageService.getToken()) {
      Swal.fire({
        icon: "warning",
        iconColor: 'darkorange',
        confirmButtonText: "OK.",
        confirmButtonColor: "darkorange",
        title: "Vui lòng đăng nhập"
      })
      this.router.navigateByUrl("/security/login");
    } else {
      if (this.pickupDate == undefined || this.returnDate == undefined) {
        Swal.fire({
          icon: "warning",
          iconColor: 'darkorange',
          confirmButtonText: "OK.",
          confirmButtonColor: "darkorange",
          title: "Vui lòng chọn ngày thuê trước"
        })
        return;
      }
      const rentalDetail = {
        car: {
          id: id
        },
        pickupDate: this.pickupDate,
        returnDate: this.returnDate
      }
      this.cartService.addToCart(rentalDetail).subscribe(() => {
        Swal.fire({
          title:"Thêm thành công",
          icon:"success",
          iconColor: 'darkorange',
          confirmButtonText: "OK.",
          confirmButtonColor:"darkorange",
          text: "Xem chi tiết trong giỏ hàng"
        })
      });
    }
  }
}
