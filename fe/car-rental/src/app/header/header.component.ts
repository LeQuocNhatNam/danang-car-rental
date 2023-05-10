import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";
import {TokenStorageService} from "../security-authentication/service/token-storage.service";
import {ShareService} from "../security-authentication/service/share.service";
import {Router} from "@angular/router";
import {LoginService} from "../security-authentication/service/login.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  username: string;
  currentUser: string;
  loginName: string;
  role: string;
  isLoggedIn = false;

  constructor(private tokenStorageService: TokenStorageService,
              private shareService: ShareService,
              private router: Router,
              private loginService: LoginService) {
  }

  loadHeader(): void {

    if (this.tokenStorageService.getToken()) {
      this.currentUser = this.tokenStorageService.getUser().username;
      this.role = this.tokenStorageService.getUser().roles[0];
      this.username = this.tokenStorageService.getUser().username;
    }
    this.isLoggedIn = this.username != null;
    this.getUsernameAccount();
  }


  ngOnInit(): void {
    this.shareService.getClickEvent().subscribe(() => {
      this.loadHeader();
    });
    this.loadHeader();
  }

  async logOut() {
    this.tokenStorageService.signOut();
    this.shareService.sendClickEvent();
    await Swal.fire({
      text: 'Đã đăng xuất',
      iconColor: 'darkorange',
      icon: 'success',
      confirmButtonColor: 'darkorange',
      showConfirmButton: false,
      timer: 1500
    });
    this.loginService.isLoggedIn = false;
    this.isLoggedIn = false;
    await this.router.navigateByUrl('/');
  }

  getUsernameAccount() {
    if (this.tokenStorageService.getToken()) {
      this.loginName = this.tokenStorageService.getUser().name;
    }
  }

}
