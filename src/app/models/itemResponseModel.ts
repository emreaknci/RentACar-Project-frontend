import { ResponseModel } from "./responseModel";

export default interface ItemResponseModel<T> extends ResponseModel{
    data:T;
}