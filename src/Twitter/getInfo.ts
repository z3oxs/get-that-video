import axios from 'axios';
import { TwitterVideoURL } from '../utils/links.json';
import { TwitterAuthorization } from '../utils/tokens.json';
import getGuestToken from './getGuestToken';

interface Video {
    user: JSON;
    tweet: JSON;
}

const getInfo = async (url: string): Promise<any> => {
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

        if (!response.includes(`"legacy"`)) {
            throw new Error('Possible invalid URL parsed.');

        }

        const userInfo = JSON.parse(response.split(`"legacy":`)[1].split(`,"super_follow`)[0]);
        const tweetInfo = JSON.parse(response.split(`"legacy":`)[2].split(`,"quick_promote`)[0]);

        const video: Video = {
            user: userInfo,
            tweet: tweetInfo,
        }

        return video;

    } catch (e) {
        return String(e);

    }
}

export default getInfo
