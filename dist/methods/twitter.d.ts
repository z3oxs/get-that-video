declare class twitter {
    getGuestToken(): Promise<string | Error>;
    static getVideo(url: string): Promise<JSON | string>;
    static getInfo(url: string): Promise<TwitterVideo | string>;
}
export { twitter };
