import React, { createContext } from 'react';

interface MainContextProps {
    userId: number | null;
    completeOnboarding: (newUserId: number) => Promise<void>;
    cardCount: number;
    setCardCount: (count: number) => void;
    everyDayCards: number;
    setEveryDayCards: (count: number) => void;
}

const MainContext = React.createContext<MainContextProps>({
    userId: null,
    completeOnboarding: async () => {},
    cardCount: 0,
    setCardCount: () => {},
    everyDayCards: 0,
    setEveryDayCards: () => {},
});

export default MainContext;
