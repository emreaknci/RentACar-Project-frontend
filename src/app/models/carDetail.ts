import { DecimalPipe } from "@angular/common";

export interface CarDetail{
    brandName:number;
    colorName:number;
    dailyPrice:DecimalPipe;
    modelYear:number;
    carDescription:string;
    images:string[];
}