import {useMutation, useQuery} from '@tanstack/react-query';
import {CreateUserResponse, UserApi, UsernameCheckResponse, UserStatsResponse} from "../api/user.api";
import {AxiosError} from "axios";

export const USERNAME_UNIQUE_QUERY_KEY = 'username_check_unique';

interface UseCheckUsernameUniqueOptions {
    username: string;
    enabled: boolean;
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
            enabled: !!userId, // The query will not execute until the userId is truthy
            onError: (error) => {
                console.error('Error fetching user stats:', error);
            },
            onSuccess: (data) => {
                console.log('User stats fetched successfully:', data);
            }
        },
    );
};

