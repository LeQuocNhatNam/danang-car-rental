import {RentalDetail} from "./rental-detail";

export interface ReservationDto {
  id?: number;
  rentalDetailDTOList?: RentalDetail[];
  bookingDate: string;
  totalPrice: number;
}
