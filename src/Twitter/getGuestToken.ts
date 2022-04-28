import axios, { AxiosResponse } from 'axios';
import { TwitterGuestTokenURL } from '../utils/links.json';
import { TwitterAuthorization } from '../utils/tokens.json';

const getGuestToken = async (): Promise<string | Error> => {
    try {
        const response: AxiosResponse = await axios.post(TwitterGuestTokenURL, {}, {
            headers: {
                Accept: 'application/json',
                Authorization: TwitterAuthorization,
            }
        })
            .then(r => r);

        if (response.status !== 200 || response.data === '') {
            throw new Error;

        }

        const { guest_token } = response.data;

        return guest_token;
    
    } catch (e) {
        return new Error;

    }
}

export default getGuestToken;
