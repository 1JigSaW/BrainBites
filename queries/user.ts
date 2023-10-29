import {useMutation, useQuery} from '@tanstack/react-query';
import {CreateUserResponse, UserApi, UsernameCheckResponse} from "../api/user.api";
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

