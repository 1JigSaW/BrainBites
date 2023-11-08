import React, { createContext } from 'react';

interface MainContextProps {
    userId: number | null;
    completeOnboarding: (newUserId: number) => Promise<void>;
    cardCount: number;
    setCardCount: (count: (prevCardCount) => any) => void;
}

const MainContext = React.createContext<MainContextProps>({
    userId: null,
    completeOnboarding: async () => {},
    cardCount: 0,
    setCardCount: () => {}
});

export default MainContext;
