interface IResponse<T> {
    message: string;
    data: T;
}
interface IResponseError {
    statusCode: number;
    message: string;
    path: string;
    timestamp: string;
}
