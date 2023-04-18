import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomePageComponent} from "./home-page/home-page.component";
import {LoginComponent} from "./login/login.component";
import {CarDetailComponent} from "./car-detail/car-detail.component";
import {CartComponent} from "./cart/cart.component";


const routes: Routes = [{
  path: '',
  component: HomePageComponent
}, {
  path: 'login',
  component: LoginComponent
}, {
  path: 'detail',
  component: CarDetailComponent
}, {
  path: 'cart',
  component: CartComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
