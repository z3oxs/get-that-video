import axios from 'axios';
import { RumbleVideoInfoURL } from '../utils/links.json';

const getVideoInfo = async (id: string): Promise<JSON | string> => {
    const infoURL = RumbleVideoInfoURL.replace(`{{ videoID }}`, id);

    try {
        const response: JSON = await axios.get(infoURL)
            .then(({ data }) => data);

        return response;

    } catch (e) {
        return String(e);

    }
}

export default getVideoInfo;
