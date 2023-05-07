import { Component, OnInit } from '@angular/core';
import {render} from "creditcardpayments/creditCardPayments";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  constructor() {
    render(
      {
        id: "#myPaypal",
        currency: "USD",
        value: "100.00",
        onApprove: (details => {
          alert("successful transaction!");
        })
      }
    )
  }

  ngOnInit(): void {
  }

}
