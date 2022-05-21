import axios from 'axios';
import { reddit as redditFormats } from '../utils/formats.json';

class reddit {
    private async getVideoInfo(url: string) {
        const response = await axios.get(url)
            .then(({ data }) => data);

        return response;
    }

    static async getVideo(url: string) {
        const urlToJSON = url[url.length - 1] === '/' ? url.slice(0, -1).concat('.json') : url.concat('.json');

        const videoInfo = JSON.stringify(await this.prototype.getVideoInfo(urlToJSON));
        const mainVideoURL = JSON.parse(videoInfo.split(`"reddit_video":`)[1].split(`},`)[0]).fallback_url;
        const mainQuality = String(mainVideoURL).split('DASH_')[1].split('.')[0];
        const videoID = String(mainVideoURL).split('.it/')[1].split('/')[0];
        const validFormats = redditFormats.filter(i => parseInt(i) <= parseInt(mainQuality));
        const videoLinks = validFormats.map(i => `https://v.redd.it/${ videoID }/DASH_${ i }.mp4`);

        const video = {
            info: JSON.parse(videoInfo),
            video: videoLinks.map((i, k) => {
                return {
                    quality: validFormats[k],
                    url: i,
                }
            }),
            audio: `https://v.redd.it/${ videoID }/DASH_audio.mp4`,
        }

        return video;        
    }
}

export { reddit };
