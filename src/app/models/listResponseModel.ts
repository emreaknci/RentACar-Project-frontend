import { ResponseModel } from "./responseModel";

export default interface ListReponseModel<T> extends ResponseModel{
    data:[];
}