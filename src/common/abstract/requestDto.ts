export interface RequestDTO {
    userId: number;
    lang: string;
    pageInfo: {
      pageNum: number;
      pageSize: number;
    };
    condition: {
       [key: string]: any
    };
}