import { useQuery } from "@tanstack/react-query";
import {UserStatsFullApi} from "../api/stats.api";
import { AxiosError } from "axios";
import { UserStatsResponse } from "../api/stats.api";

export const useUserStatsFull = (user_id: number | null) => {
  return useQuery<UserStatsResponse, AxiosError>(
    ['userStats', user_id],
    () => UserStatsFullApi.getUserStats(user_id),
    {
      onError: (error) => {
        console.error('Error fetching user stats:', error);
      },
      onSuccess: (data) => {
        console.log('Fetched user stats successfully:', data);
      },
      enabled: !!user_id,
    }
  );
};
