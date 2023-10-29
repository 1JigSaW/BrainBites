import React, { createContext } from 'react';

interface MainContextProps {
    userId: number | null;
    completeOnboarding: (newUserId: number) => Promise<void>;
}

const MainContext = React.createContext<MainContextProps>({
    userId: null,
    completeOnboarding: async () => {}
});

export default MainContext;
