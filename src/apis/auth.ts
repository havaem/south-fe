import { post } from "@/configs";

const ENDPOINT = "/auth";
export const ApiAuth = {
    getProfile: () => post<IResponse<IAuthGetProfileResponse>>(ENDPOINT),
    register: (data: IAuthRegisterPayload) => post<IAuthRegisterResponse>(`${ENDPOINT}/register`, data),
    login: (data: IAuthLoginPayload) => post<IAuthLoginResponse>(`${ENDPOINT}/login`, data),
    loginWithGoogle: (data: IAuthLoginWithGooglePayload) =>
        post<IAuthLoginResponse>(`${ENDPOINT}/login-with-google`, data),
};

interface IAuthRegisterPayload {
    name: {
        first: string;
        last: string;
    };
    email: string;
    password: string;
}
interface IAuthRegisterResponse
    extends IResponse<{
        token: {
            accessToken: string;
            refreshToken: string;
        };
        user: any;
    }> {}

interface IAuthLoginPayload {
    username: string;
    password: string;
}
interface IAuthLoginResponse extends IAuthRegisterResponse {}

interface IAuthGetProfileResponse extends IResponse<{}> {}

interface IAuthLoginWithGooglePayload {
    token: string;
}
