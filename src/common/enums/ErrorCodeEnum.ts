

export const ErrorEnum = {

    SYS_ERR_GLOBAL: [1000,"Lỗi hệ thống chung Ngoại lệ xử lý hệ thống, vui lòng thử lại sau"],
    SYS_ERR_CREATE_FAILED: [1001,"Không thể thêm dữ liệu"],
    SYS_ERR_UPDATE_FAILED: [1002,"Không thể sửa đổi dữ liệu"],
    SYS_ERR_DELETE_FAILED: [1003,"Không thể Xóa dữ liệu"],

    SYS_ERR_VALIDATE: [1100, "1%"],
    SYS_ERR_TOKEN: [1101, "Token không hợp lệ !"],
    SYS_ERR_FIELD_REQUEST: [1102, "Request không hơp lệ !"],
    SYS_ERR_JSON_REQUEST: [1103, "JSON không hơp lệ !"],
    SYS_ERR_CODE: [1103, "Code không hơp lệ !"],

    //spcm00101
    SPCM00101_ERR_EMAIL_LOGIN: [1200, "Email chưa đăng ký !"],
    SPCM00101_ERR_PASS_LOGIN: [1201, " Mật khẩu không đúng !"],

    
    // sys_role msg
    SYS_ROLE_ERR_NONE: [1300,"Role không tồn tại !"],

    // sys_datasc_msg
    SYS_DATASC_ERR_NOID: [1400, 'ID không tồn tại !'],

    // sys_department
    SYS_DEPARTMENT_ERR_NOID: [1600, 'Department không tồn tại !'],

    // Spmt00900 

    SPMT009900_ERR_NO_PRODUCT: [1500,'Sản phẩm không tồn tại !'],


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


