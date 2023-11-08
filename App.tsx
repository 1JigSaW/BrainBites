import React, {useEffect, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import MainNavigator from "./navigation/MainNavigator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import OnboardingNavigator from "./navigation/OnboardingNavigator";
import {firstLaunchTest, user} from "./constants";
import MainContext from './navigation/MainContext';
import Toast from "react-native-toast-message";

const queryClient = new QueryClient();

function App(): JSX.Element | null {
    const [userId, setUserId] = useState<number | null>(null);
    const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null);
    const [cardCount, setCardCount] = useState<number>(0);

    useEffect(() => {
        AsyncStorage.getItem(firstLaunchTest).then(value => {
            if (value == null) {
                setIsFirstLaunch(true);
            } else {
                setIsFirstLaunch(false);
            }
        });
        AsyncStorage.getItem(user).then(value => {
            if (value !== null) {
                setUserId(JSON.parse(value).id);
            }
        });
    }, []);

    const completeOnboarding = async (newUserId: number) => {
        setUserId(newUserId);
        await AsyncStorage.setItem(firstLaunchTest, 'true');
        setIsFirstLaunch(false);
    };

    if (isFirstLaunch === null) {
        return null;
    }

    console.log('userId', userId);
  return (
      <MainContext.Provider value={{ userId, completeOnboarding, cardCount, setCardCount }}>
          <QueryClientProvider client={queryClient}>
              <NavigationContainer>
                  {isFirstLaunch ? <OnboardingNavigator /> : <MainNavigator />}
              </NavigationContainer>
              <Toast />
          </QueryClientProvider>
      </MainContext.Provider>
  );
}

export default App;
