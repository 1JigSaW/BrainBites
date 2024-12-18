import React, { createContext } from 'react';

interface MainContextProps {
    userId: number | null;
    setUserId: (id: number) => void;
    completeOnboarding: () => void;
    completeAuth: () => void;
    cardCount: number;
    setCardCount: (count: number) => void;
    everyDayCards: number;
    setEveryDayCards: (count: number) => void;
    lives: number;
    setLives: (count: number) => void;
    username: string| null;
    setUsername: (username: string) => void;
    setIsFirstLaunch: (username: boolean) => void;
    setIsAuthLaunch: (username: boolean) => void;
}

const MainContext = React.createContext<MainContextProps>({
    userId: null,
    setUserId: () => {},
    completeOnboarding: async () => {},
    completeAuth: async () => {},
    cardCount: 0,
    setCardCount: () => {},
    everyDayCards: 0,
    setEveryDayCards: () => {},
    lives: 0,
    setLives: () => {},
    username: null,
    setUsername: () => {},
    setIsFirstLaunch: () => {},
    setIsAuthLaunch: () => {},
});

export default MainContext;
