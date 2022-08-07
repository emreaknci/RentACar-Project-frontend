import { ResponseModel } from "./responseModel";

export default interface SingleResponseModel<T> extends ResponseModel{
    data:T;
}