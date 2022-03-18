import { DecimalPipe } from "@angular/common";

export interface Car{
    id:number;
    brandId:number;
    colorId:number;
    modelYear:number;
    dailyPrice:DecimalPipe;
    description:string;
}