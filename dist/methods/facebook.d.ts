declare class facebook {
    static getVideo: (url: string) => Promise<JSON | string>;
    static getInfo: (url: string) => Promise<FacebookVideo | string>;
}
export { facebook };
