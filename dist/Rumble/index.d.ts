declare class Rumble {
    static getVideoInfo: Function;
    static getVideo(url: string): Promise<JSON | string>;
}
export { Rumble };
