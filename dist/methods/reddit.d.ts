declare class reddit {
    private getVideoInfo;
    static getVideo(url: string): Promise<{
        info: any;
        video: {
            quality: string;
            url: string;
        }[];
        audio: string;
    }>;
}
export { reddit };
