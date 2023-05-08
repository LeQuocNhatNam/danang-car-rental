import {CarDTO} from "./car-dto";
import {Image} from "./image";

export interface RentalDetail {
  id?: number;
  reservationId?: number;
  pickupDate?: string;
  returnDate?: string;
  imageList?: Image[];
  totalPrice?: number;
  diffDays?: number;
}
