import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CarDTO} from "../model/car-dto";

@Injectable({
  providedIn: 'root'
})
export class CarService {
  URL_FIND_ALL_CARS = "http://localhost:8080/api/public/car/list";
  URL_FIND_CAR_BY_ID = "http://localhost:8080/api/public/car/detail/";
  URL_SEARCH_CAR_BY_DATE = "http://localhost:8080/api/public/car/search-car-by-date/";
  constructor(private httpClient: HttpClient) {
  }

  findAllCar(page: number, model: string): Observable<any> {
    return this.httpClient.get(this.URL_FIND_ALL_CARS + "?page=" + page + "&model=" + model);
  }

  findCarById(id: number): Observable<any> {
    return this.httpClient.get(this.URL_FIND_CAR_BY_ID + id);
  }

  searchCarsByDate(page: number, model: string, pickupDate: string, returnDate: string): Observable<any> {
    return this.httpClient.get(this.URL_SEARCH_CAR_BY_DATE + "?page=" + page + "&model=" + model + "&pickupDate=" + pickupDate
      + "&returnDate=" + returnDate);
  }
}
