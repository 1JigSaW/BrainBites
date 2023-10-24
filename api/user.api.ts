import {API} from "./API";

export interface UsernameCheckResponse {
    isUnique: boolean;
}

export class UserApi {
    static async checkUsernameUnique(username: string): Promise<UsernameCheckResponse> {
        try {
            const {data} = await API.get(`/api/check_unique/${username}/`);
            return data;
        } catch (error) {
            throw error;
        }
    }
}
