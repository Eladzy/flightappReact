export interface IConfigHeaders {
    headers: {
        [index: string]: string;
    };
}
export interface IAuthReduxProps {
    auth: { isAuthenticated: boolean };
    // error: IError;
}
