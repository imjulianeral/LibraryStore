import { SEARCH_USER } from './types';

export const searchUser = user => {
    return {
        type: SEARCH_USER,
        user
    }
}