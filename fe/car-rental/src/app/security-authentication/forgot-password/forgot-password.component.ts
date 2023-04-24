import {Component, OnInit} from '@angular/core';
import {LoginService} from '../service/login.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  message = '';

  constructor(private loginService: LoginService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.view();
  }
  view(): void {
    const element = document.getElementById('login');
    if (element) {
      element.scrollIntoView();
    }
  }


  onSubmit(username: string) {
    let timerInterval
    Swal.fire({
      title: 'Đang xử lý!',
      html: 'Vui lòng đợi trong giây lát...',
      timerProgressBar: true,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading()
        const b = Swal.getHtmlContainer().querySelector('b')
        timerInterval = setInterval(() => {
          b.textContent = String(Swal.getTimerLeft())
        }, 100)
      },
      willClose: () => {
        clearInterval(timerInterval)
      }
    });

    this.loginService.forgotPassword(username).subscribe(() => {
      clearInterval(timerInterval); // ngưng interval khi đã nhận được phản hồi
      Swal.fire({
        text: 'Mật khẩu đã được gửi về email của bạn. ' +
          'Vui lòng kiểm tra email để lấy mật khẩu đăng nhập!',
        icon: 'success',
        iconColor: 'orange',
        confirmButtonColor: 'orange',
        confirmButtonText: 'OK'
      }).then(() => {
        this.router.navigateByUrl('/security/login');
      });
    }, error => {
      clearInterval(timerInterval); // ngưng interval khi đã nhận được phản hồi
      this.message = error.error.message;
      if (!this.message) {
        this.message = 'Vui lòng nhập địa chỉ email của bạn!';
      }
      Swal.fire({
        text: this.message,
        icon: 'error',
        confirmButtonText: 'OK'
      });
    });
  }
}
