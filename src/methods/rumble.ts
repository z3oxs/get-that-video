import axios from 'axios';
import { RumbleVideoInfoURL } from '../utils/links.json';

class rumble {    
    // Get all video info based on parsed ID from 'getVideo'
    private async getVideoInfo(id: string): Promise<JSON | string> {
        const infoURL = RumbleVideoInfoURL.replace(`{{ videoID }}`, id);

        try {
            const response = await axios.get(infoURL)
                .then(({ data }) => data);

            return response;

        } catch (e) {
            return String(e);

        }
    }

    // Main function that will get the ID, parse to ''getVideoInfo'
    // and return the JSON from promise resolve
    static async getVideo(url: string): Promise<JSON | string> {
        try {
            const response = await axios.get(url, {
                transformResponse: String,
            })
                .then(({ data }) => data);

            if (!response.includes(`"video"`)) {
                throw new Error('Possibly invalid URL parsed.');

            }

            const videoID = response.split(`,"video":"`)[1].split(`",`)[0];
            const video = await this.prototype.getVideoInfo(videoID);

            return video;

        } catch (e) {
            return String(e);
            
        }
    }
}

export { rumble }
