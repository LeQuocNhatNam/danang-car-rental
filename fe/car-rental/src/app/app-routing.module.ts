import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomePageComponent} from "./home-page/home-page.component";
import {CarDetailComponent} from "./car-detail/car-detail.component";
import {CartComponent} from "./cart/cart.component";
import {EmployeeComponent} from "./employee/employee.component";
import {CustomerComponent} from "./customer/customer.component";
import {UserGuard} from "./security-authentication/security-auth/user.guard";
import {AdminGuard} from "./security-authentication/security-auth/admin.guard";
import {ErrorPageComponent} from "./error-page/error-page.component";
import {PaymentComponent} from "./payment/payment.component";

const routes: Routes = [
  {
    path: 'security',
    loadChildren: () => import('./security-authentication/security-authentication.module')
      .then(module => module.SecurityAuthenticationModule),
  },

  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'detail/:id',
    component: CarDetailComponent
  }, {
    path: 'cart',
    component: CartComponent
  },
  {
    path: 'employee',
    component: EmployeeComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'customer',
    component: CustomerComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'error',
    component: ErrorPageComponent
  }, {
    path: 'payment',
    component: PaymentComponent
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule],
})

export class AppRoutingModule {
}
