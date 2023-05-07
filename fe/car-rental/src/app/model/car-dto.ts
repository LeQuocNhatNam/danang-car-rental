import {Image} from "./image";

export interface CarDTO {
  id?: number;
  price?: number;
  model?: string;
  numberPlate?: string;
  brand?: string;
  description?: string;
  imageList?: Image[];
}
