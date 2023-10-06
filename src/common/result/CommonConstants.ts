// Khai báo lớp CommonConstants
export class CommonConstants {
    /**
    * Result Code
    */
    public static ResultCodeStatus = class {
        /**
        * RESULT_SUCCESS
        */
        public static readonly RESULT_SUCCESS = 0;

        /**
        * RESULT_FAILURE
        */
        public static readonly RESULT_FAILURE = -1;
    };

    /**
    * Result Message
    */
    public static ResultCodeMessage = class {
        /**
        * RESULT_SUCCESS_MESSAGE
        */
        public static readonly RESULT_SUCCESS_MESSAGE = "SUCCESS";

        /**
        * RESULT_FAILURE_MESSAGE
        */
        public static readonly RESULT_FAILURE_MESSAGE = "FAILURE";
    };

    /**
    * Delete Code
    */
    public static DeleteCodeStatus = class {
        /**
        * IS_NOT_DELETE
        */
        public static readonly IS_NOT_DELETE = 0;

        /**
        * IS_DELETE
        */
        public static readonly IS_DELETE = 1;
    };

    /**
    * operation Code
    */
    public static DataBaseOperationStatus = class {
        /**
        * IS_NOT_DELETE
        */
        public static readonly IS_SUCCESS = 1;

        /**
        * IS_DELETE
        */
        public static readonly IS_FAILURE = 0;
    };
}