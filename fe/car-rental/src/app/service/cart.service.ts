import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private URL_ADD_TO_CART = "http://localhost:8080/api/user/cart/add";
  private URL_CART_LIST = "http://localhost:8080/api/user/cart";
  private URL_DELETE_CART_ITEM = "http://localhost:8080/api/user/cart/delete/";
  private URL_COMPLETE_PAYMENT = "http://localhost:8080/api/user/cart/pay";

  constructor(private httpClient: HttpClient) {
  }

  addToCart(rentalDetail: any): Observable<any> {
    return this.httpClient.post(this.URL_ADD_TO_CART, rentalDetail);
  }

  getCart(): Observable<any> {
    return this.httpClient.get(this.URL_CART_LIST);
  }


  deleteCartItem(id: number): Observable<any> {
    return this.httpClient.delete(this.URL_DELETE_CART_ITEM + id);
  }

  completePayment(): Observable<any> {
    return this.httpClient.put(this.URL_COMPLETE_PAYMENT,"");
  }
}
