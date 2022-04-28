import axios from 'axios';
import getVideoInfo from './getVideoInfo';

const getVideo = async (url: string): Promise<JSON | string> => {
    try {
        const response: String = await axios.get(url)
            .then(({ data }) => data);

        if (!response.includes(`"video"`)) {
            throw new Error('Possibly invalid URL parsed.');

        }

        const videoID = response.split(`,"video":"`)[1].split(`",`)[0];
        const video = await getVideoInfo(videoID);

        return video;

    } catch (e) {
        return String(e);
        
    }
}

export default getVideo;
