import axios from 'axios';
import { TwitterGuestTokenURL, TwitterVideoURL } from '../utils/links.json';
import { TwitterAuthorization } from '../utils/tokens.json';

class twitter {
    // Will get a valid guestToken to do all requests
    async getGuestToken(): Promise<string | Error> {
        try {
            const response = await axios.post<GuestTokenResponse>(TwitterGuestTokenURL, {}, {
                headers: {
                    Accept: 'application/json',
                    Authorization: TwitterAuthorization,
                },
            })
                .then(({ data }) => data);

            if (!response.guest_token) {
                throw new Error;

            }

            return response.guest_token; 
        
        } catch (e) {
            return new Error;

        }
    }

    // Will return only the video formats
    static async getVideo(url: string): Promise<JSON | string> {
        const videoID = url.split('/')[5];
        const guestToken = await this.prototype.getGuestToken();
        const getVideoURL = TwitterVideoURL.replace('{{ videoID }}', videoID);

        try {
            if (guestToken instanceof Error) {
                throw new Error('Failed to get guest token.');

            }

            const response = await axios.get(getVideoURL, {
                headers: {
                    Host: 'twitter.com',
                    Authorization: TwitterAuthorization,
                    'X-Guest-Token': guestToken,
                },
                transformResponse: String
            })
                .then(({ data }) => data);

            if (!response.includes(`"variants"`)) {
                throw new Error('Possible invalid URL parsed.');

            }

            const variants = JSON.parse(response.split(`"variants":`)[1].split(`}}]`)[0]);
            
            return variants;
        
        } catch (e) {
            return String(e);

        }
    }

    // Will return all important information, like user and tweet information (including
    // video formats inside the media object)
    static async getInfo(url: string): Promise<TwitterVideo | string> {
        const videoID = url.split('/')[5];
        const guestToken = await this.prototype.getGuestToken();
        const getVideoURL = TwitterVideoURL.replace('{{ videoID }}', videoID);

        try {
            if (guestToken instanceof Error) {
                throw new Error('Failed to get guest token.');

            }

            const response = await axios.get(getVideoURL, {
                headers: {
                    Host: 'twitter.com',
                    Authorization: TwitterAuthorization,
                    'X-Guest-Token': guestToken,
                },
                transformResponse: String,
            })
            .then(({ data }) => data);

            if (!response.includes(`"legacy"`)) {
                throw new Error('Possible invalid URL parsed.');

            }

            const video: TwitterVideo = {
                user: JSON.parse(response.split(`"legacy":`)[1].split(response.includes(`"professional"`) ? `,"professional` : `,"super_follow`)[0]),
                tweet: JSON.parse(response.split(`"legacy":`)[2].split(`,"quick_promote`)[0]),
            }

            return video;

        } catch (e) {
            return String(e);

        }
    }
}

export { twitter }
