export interface RequestDTO {
    userId: number;
    lang: string;
    pageInfo: {
      pageNum: number;
      pageSize: number;
    };
    filters: {
       [key: string]: any
    };
}