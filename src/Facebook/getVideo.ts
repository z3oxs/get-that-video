import axios from 'axios';
import { FacebookAcceptHeader } from '../utils/tokens.json';

const getVideo = async (url: string): Promise<JSON | string> => {
    try {
        const response: String = await axios.get(url, {
            headers: {
                Accept: FacebookAcceptHeader,
            }
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

export default getVideo;
