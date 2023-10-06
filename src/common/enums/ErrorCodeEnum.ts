

export const ErrorEnum = {
    SYS_ERR_GLOBAL: [1000,"Lỗi hệ thống chung Ngoại lệ xử lý hệ thống, vui lòng thử lại sau"],
    SYS_ERR_CREATE_FAILED: [1001,"Không thể thêm dữ liệu"],
    SYS_ERR_UPDATE_FAILED: [1002,"Không thể sửa đổi dữ liệu"]
}


export class ErrorCodeEnum {
    public code: number;
    public msg: string;

    constructor(errorEnum: any) {
        this.code = errorEnum[0],
        this.msg = errorEnum[1]
    }

    getCode() {
        return this.code;
    }

    getMsg() {
        return this.msg;
    }
}


