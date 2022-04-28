import axios from 'axios';
import { FacebookAcceptHeader } from '../utils/tokens.json';

interface Info {
    title: string;
    author: JSON;
    formats: [];
}

const getInfo = async (url: string): Promise<any> => {
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

        const info: Info = {
            title: response.split(`"message":{"text":"`)[1].split(`",`)[0],
            author: JSON.parse(response.replace(`\\`, '').split(`"owner_as_page":`)[1].split(`,"__isActor"`)[0]),
            formats: JSON.parse(response.replace(`\\`, '').split(`"representations":`)[1].split(`,"video_id"`)[0]),
        }

        return info
        
    } catch (e) {
        return String(e);

    }
}

export default getInfo;
