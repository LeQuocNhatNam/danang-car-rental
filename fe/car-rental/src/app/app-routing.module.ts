import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomePageComponent} from "./home-page/home-page.component";
import {CarDetailComponent} from "./car-detail/car-detail.component";
import {CartComponent} from "./cart/cart.component";


const routes: Routes = [
  {
    path: 'security',
    loadChildren: () => import('./security-authentication/security-authentication.module')
      .then(module => module.SecurityAuthenticationModule),
  },
  {
    path: '',
    component: HomePageComponent
  },
  {
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
