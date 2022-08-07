import { CreditCard } from "./creditCard"

export interface CustomerDetailModel {
    id: number,
    email:string,
    firstName:string,
    lastName:string,
    companyName:string,
    creditCards:CreditCard[]
  }