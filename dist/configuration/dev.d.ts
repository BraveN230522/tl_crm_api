declare const _default: () => {
    app: {
        baseUrlPrefix: string;
    };
    accessToken: {
        expiresIn: string;
        rememberMeIn: string;
        secret: string;
    };
    refreshToken: {
        expiresIn: string;
    };
    temporaryToken: {
        expiresIn: string;
        secret: string;
    };
};
export default _default;
