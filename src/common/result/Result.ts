import { ErrorCodeEnum, ErrorEnum } from "@common/enums/ErrorCodeEnum";
import { CommonConstants } from "./CommonConstants";

export class Result<T> {
    code: number;
    msg: string;
    data: T | undefined;

    constructor(code: number, msg: string, data?: T) {
        this.code = code;
        this.msg = msg;
        this.data = data;
    }

    static success<T>(data?: T): Result<T> {
        return new Result<T>(CommonConstants.ResultCodeStatus.RESULT_SUCCESS, CommonConstants.ResultCodeMessage.RESULT_SUCCESS_MESSAGE, data);
    }

    static failure<T>(): Result<T> {
        return new Result<T>(CommonConstants.ResultCodeStatus.RESULT_FAILURE, CommonConstants.ResultCodeMessage.RESULT_FAILURE_MESSAGE);
    }

    static failureCode<T>(arrayCodeError: any): Result<T> {
        const errorCode = new ErrorCodeEnum(arrayCodeError);
        return new Result<T>(errorCode.getCode(), errorCode.getMsg());
    }
}