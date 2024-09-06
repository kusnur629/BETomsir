export interface User {
    referrer: string;
    name: string;
    email: string;
}
export interface GetTokenResponse {
    access_token: string;
    token_type: string;
    refresh_token: string;
    expires_in: number;
    scope: string;
    user: User;
}
