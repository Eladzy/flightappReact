import axios from 'axios';
import { mainUrl, checkUsernameUrl } from '../consts';
export async function isUsernameAvailable(username) {
    return await axios.get(mainUrl + checkUsernameUrl, { params: { username: username } })
        .then(resp => { return resp.data; }).catch(err => (console.log(err)))
}