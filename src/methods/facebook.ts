import axios from 'axios';
import { FacebookAcceptHeader } from '../utils/tokens.json';

class facebook {
    // Return only the video formats as a Array of Objects
    static async getVideo(url: string): Promise<JSON | string> {
        try {
            const response = await axios.get(url, {
                headers: {
                    Accept: FacebookAcceptHeader,
                },
                transformResponse: String,
            })
            .then(({ data }) => data);

            if (!response.includes(`"representations"`)) {
                throw new Error('Possibly invalid URL parsed.');

            }

            const formats = JSON.parse(response.replace(`\\`, '').split(`"representations":`)[1].split(`,"video_id"`)[0]);

            return formats;

        } catch (e) {
            return String(e);

        }
    }

    // Will return all important information about the video, like the title, author
    // and all the formats as a Array of Objects
    static async getInfo(url: string): Promise<FacebookVideo | string> {
        try {
            const response= await axios.get(url, {
                headers: {
                    Accept: FacebookAcceptHeader,
                },
                transformResponse: String,
            })
                .then(({ data }) => data);

            if (!response.includes(`"representations"`)) {
                throw new Error('Possibly invalid URL parsed.');

            }

            const info: FacebookVideo = {
                title: response.split(`"message":{"text":"`)[1].split(`",`)[0],
                author: JSON.parse(response.replace(`\\`, '').split(`"owner_as_page":`)[1].split(`,"__isActor"`)[0]),
                formats: JSON.parse(response.replace(`\\`, '').split(`"representations":`)[1].split(`,"video_id"`)[0]),
            }

            return info
            
        } catch (e) {
            return String(e);

        }
    }

}

export { facebook }
