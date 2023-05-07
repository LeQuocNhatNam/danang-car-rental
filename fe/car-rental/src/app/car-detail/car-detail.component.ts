import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CarService} from "../service/car.service";
import {CarDTO} from "../model/car-dto";
import Swal from "sweetalert2";
import {TokenStorageService} from "../security-authentication/service/token-storage.service";
import {CartService} from "../service/cart.service";
import {HomePageComponent} from "../home-page/home-page.component";
import {RentalDetail} from "../model/rental-detail";

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  carId?: number;
  carDTO?: CarDTO;
  VND = new Intl.NumberFormat();
  rentalDetailDTOList?: RentalDetail[];
  options = {day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'UTC'};


  constructor(private activatedRoute: ActivatedRoute,
              private  carService: CarService,
              private tokenStorageService: TokenStorageService,
              private router: Router,
              private cartService: CartService) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(id => {
      this.carId = +id.get("id");
      this.carService.findCarById(this.carId).subscribe(carDTO => {
        this.carDTO = carDTO;
        debugger
      })
    });
  }

  addToCart(pickupDate: string, returnDate: string, id: number) {
    debugger

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
      if (pickupDate == "" || returnDate == "") {
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
        pickupDate: pickupDate,
        returnDate: returnDate
      }
      this.cartService.addToCart(rentalDetail).subscribe(() => {
        Swal.fire({
          title: "Thêm thành công",
          icon: "success",
          iconColor: 'darkorange',
          confirmButtonText: "OK.",
          confirmButtonColor: "darkorange",
          text: "Xem chi tiết trong giỏ hàng"
        })
      }, error => {
        debugger
        this.rentalDetailDTOList = error.error;
        for (let i = 0; i < this.rentalDetailDTOList.length; i++) {
          const pickupDate = new Date(this.rentalDetailDTOList[i].pickupDate);
          const returnDate = new Date(this.rentalDetailDTOList[i].returnDate);
          this.rentalDetailDTOList[i].pickupDate = pickupDate.toLocaleDateString("vi-VN", this.options);
          this.rentalDetailDTOList[i].returnDate = returnDate.toLocaleDateString("vi-VN", this.options);
        }
        if (error.status === 400) {
          Swal.fire({
            text: "Xe bận lịch vào thời gian đã chọn",
            icon: "error",
            confirmButtonText: "OK",
            confirmButtonColor: "darkorange",
            title: "Không thành công"
          })
        }
      });
    }
  }


}
