import {useMutation, useQuery} from '@tanstack/react-query';
import {CreateUserResponse, UserApi, UsernameCheckResponse, UserStatsResponse} from "../api/user.api";
import {AxiosError} from "axios";

export const USERNAME_UNIQUE_QUERY_KEY = 'username_check_unique';

interface UseCheckUsernameUniqueOptions {
    username: string;
    enabled: boolean;
}

const USERS_QUERY_KEY = 'users';

interface UseGetUsersOptions {
    sortBy?: string;
    returnAll?: boolean;
    userId?: number | null;
}

export const useCheckUsernameUnique = () => {
    return useMutation<UsernameCheckResponse, AxiosError, string>(
        (username: string) => UserApi.checkUsernameUnique(username),
        {
            onError: error => {
                console.error(error);
            }
        },
    );


};

export const useCreateUser = () => {
    return useMutation<CreateUserResponse, AxiosError, { username: string; topicIds: number[] }>(
        ({ username, topicIds }) => UserApi.createUser(username, topicIds),
        {
            onError: (error) => {
                console.error('Error creating user:', error);
            },
            onSuccess: (data) => {
                console.log('User created successfully:', data);
            }
        },
    );
};


export const useGetUserStats = (userId: number | null) => {
    return useQuery<UserStatsResponse, AxiosError>(
        ['user_stats', userId],
        () => UserApi.getUserStats(userId),
        {
            enabled: !!userId, // Запрос не будет выполнен, пока userId не станет истинным
            refetchOnWindowFocus: true, // Автоматически повторяет запрос при фокусировке окна
            onError: (error) => {
                console.error('Error fetching user stats:', error);
            },
            onSuccess: (data) => {
                console.log('User stats fetched successfully:', data);
            },
        },
    );
};


export const useGetUsers = ({ sortBy, returnAll, userId }: UseGetUsersOptions) => {
    return useQuery<UserStatsResponse[], AxiosError>(
        [USERS_QUERY_KEY, sortBy, returnAll, userId],
        () => UserApi.getUsers(sortBy, returnAll, userId),
        {
            enabled: returnAll !== undefined,
            refetchOnWindowFocus: false,
            onError: (error) => {
                console.error('Error fetching users:', error);
            },
            onSuccess: (data) => {
                console.log('Users fetched successfully:', data);
            },
        },
    );
};


