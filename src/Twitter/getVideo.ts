import axios from "axios";
import { TwitterVideoURL } from '../utils/links.json';
import { TwitterAuthorization } from '../utils/tokens.json';
import getGuestToken from "./getGuestToken";

const getVideo = async (url: string): Promise<any> => {
    const videoID = url.split('/')[5];
    const guestToken = await getGuestToken();
    const getVideoURL = TwitterVideoURL.replace('{{ videoID }}', videoID);

    try {
        if (guestToken instanceof Error) {
            throw new Error('Failed to get guest token.');

        }

        const response: String = await axios.get(getVideoURL, {
            headers: {
                Host: 'twitter.com',
                Authorization: TwitterAuthorization,
                'X-Guest-Token': guestToken,
            }
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

export default getVideo;
