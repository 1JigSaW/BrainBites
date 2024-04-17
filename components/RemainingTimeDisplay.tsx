import React, { useEffect, FC } from 'react';
import { Text } from 'react-native';
import {BLACK} from "../colors";
import {Quicksand_Regular} from "../fonts";

interface RemainingTimeDisplayProps {
    remainingTime: number | null;
    setRemainingTime: React.Dispatch<React.SetStateAction<number | null>>;
    mutate: (options: { userId: string }) => Promise<void>;
    userId: string;
    refetch: () => Promise<void>;
}

const RemainingTimeDisplay = ({ remainingTime, setRemainingTime, mutate, userId, refetch }: any) => {

    useEffect(() => {
        let intervalId: NodeJS.Timeout | null = null;
        if (remainingTime && remainingTime > 0) {
            intervalId = setInterval(async () => {
                setRemainingTime((prevTime: number | null) => {
                    if (prevTime !== null) {
                        const nextTime = prevTime - 1;
                        if (nextTime < 1) {
                            if (intervalId) clearInterval(intervalId);
                            async function updateData() {
                                await mutate({ userId });
                                await refetch();
                            }
                            updateData();
                            return 0;
                        }
                        return nextTime;
                    }
                    return null;
                });
            }, 1000);
        }

        return () => {
            if (intervalId) clearInterval(intervalId);
        };
    }, [remainingTime, setRemainingTime, mutate, userId, refetch]);

    const formatTime = (time: number): string => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <Text style={{fontSize: 18, color: BLACK, fontFamily: Quicksand_Regular,}}>
            {remainingTime && remainingTime > 0 ? formatTime(remainingTime) : ""}
        </Text>
    );
};

export default RemainingTimeDisplay;
