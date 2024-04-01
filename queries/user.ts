import {useMutation, useQuery, UseQueryResult} from '@tanstack/react-query';
import {CreateUserResponse, LivesResponse, UserApi, UsernameCheckResponse, UserStatsResponse} from "../api/user.api";
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

export interface AxiosErrorResponse {
  response: {
    data: {
      error: string;
    }
  }
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
    return useMutation<CreateUserResponse, AxiosError, {
        username: string, count_cards: number, avatarUrl: string, email: string, password: string }>(
        ({
             username,
             count_cards,
             avatarUrl,
             email,
             password }) => UserApi.createUser(
                 username,
                count_cards,
                avatarUrl,
                email,
                password),
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


export const useLoseLife = () => {
    return useMutation<{message: string, lives_remaining: number} | {error: string}, AxiosError, number>(
        (userId: number) => UserApi.loseLife(userId),
        {
            onError: (error) => {
                console.error('Error losing life:', error);
            },
            onSuccess: (data) => {
                console.log('Life lost successfully:', data);
            },
        },
    );
};


export const useGetLives = (userId: number | null): UseQueryResult<LivesResponse, AxiosError> => {
    return useQuery<LivesResponse, AxiosError>(
        ['get_lives', userId],
        () => UserApi.getLives(userId),
        {
            enabled: !!userId, // Запрос активируется, только если userId предоставлен
            refetchOnWindowFocus: false, // Отключаем автоматический повторный запрос при фокусировке окна
            onError: (error) => {
                console.error('Error fetching lives:', error);
            },
            onSuccess: (data) => {
                console.log('Lives fetched successfully:', data);
            },
        },
    );
};

export const useLoginUser = () => {
    return useMutation<
        { user?: (user: any) => unknown; token: string },
        AxiosError,
        { email: string, password: string },
        unknown
    >(
        ({ email, password }) => UserApi.loginUser(email, password).then(result => {
            if ('error' in result) {
                throw new Error(result.error);
            }
            // Assuming that the API will always return an object with a token string.
            // The user property is not expected in the response, so we do not include it here.
            return { token: result.token };
        }),
        {
            onError: (error) => {
                console.error('Error logging in:', error);
            },
            onSuccess: (data) => {
                console.log('Logged in successfully:', data);
            },
        },
    );
};


export const useGoogleSignIn = () => {
    return useMutation<
        { user: {email: string, id: number} },
        AxiosError,
        { idToken: string },
        unknown
    >(
        ({ idToken }) => UserApi.googleSignIn(idToken).then(result => {
            if ('error' in result) {
                throw new Error(result.error);
            }
            return { user: result.user };
        }),
        {
            onError: (error) => {
                console.error('Error during Google sign in:', error);
            },
            onSuccess: (data) => {
                console.log('Google sign in successful:', data);
                // Здесь вы можете, например, сохранить данные пользователя
                // localStorage.setItem('user', JSON.stringify(data.user));
            },
        },
    );
};


export const usePurchaseLives = () => {
    return useMutation<
        { success: string; current_xp: number; current_lives: number; },
        Error,
        { userId: number; cost: number; }
    >(
        async ({ userId, cost }) => {
            const result = await UserApi.purchaseLives(userId, cost);
            if ('error' in result) {
                throw new Error(result.error);
            }
            return result;
        },
        {
            onError: (error) => {
                console.error('Error purchasing lives:', error.message);
            },
            onSuccess: (data) => {
                console.log('Lives purchased successfully:', data);
            },
        },
    );
};
