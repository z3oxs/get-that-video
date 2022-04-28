export declare const Facebook: {
    getInfo: (url: string) => Promise<string | FacebookVideo>;
    getVideo: (url: string) => Promise<string | JSON>;
};
