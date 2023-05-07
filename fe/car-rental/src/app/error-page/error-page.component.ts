import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../security-authentication/service/token-storage.service";

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {
  isLoggedIn = false;
  constructor(private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.view();
    this.isLoggedIn = this.tokenStorageService.isLogger();
  }
  view(): void {
    const element = document.getElementById('error-page');
    if (element) {
      element.scrollIntoView();
    }
  }

}
