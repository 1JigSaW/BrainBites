import React, {useEffect, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import MainNavigator from "./navigation/MainNavigator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import OnboardingNavigator from "./navigation/OnboardingNavigator";
import {authLaunch, CARDS_COUNT, EVERYDAY_CARDS, firstLaunchTest, LIVES, user} from "./constants";
import MainContext from './navigation/MainContext';
import Toast from "react-native-toast-message";
import AuthNavigator from "./navigation/AuthNavigator";

const queryClient = new QueryClient();

function App(): JSX.Element | null {
    const [userId, setUserId] = useState<number | null>(null);
    const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null);
    const [isAuthLaunch, setIsAuthLaunch] = useState<boolean | null>(null);
    const [cardCount, setCardCount] = useState<number>(0);
    const [everyDayCards, setEveryDayCards] = useState<number>(0);
    const [lives, setLives] = useState<number>(0);

    useEffect(() => {
        AsyncStorage.getItem(firstLaunchTest).then(value => {
            if (value == null) {
                setIsFirstLaunch(true);
            } else {
                setIsFirstLaunch(false);
            }
        });
        AsyncStorage.getItem(authLaunch).then(value => {
            if (value == null) {
                setIsAuthLaunch(true);
            } else {
                setIsAuthLaunch(false);
            }
        });
        AsyncStorage.getItem(user).then(value => {
            if (value !== null) {
                setUserId(JSON.parse(value).id);
            }
        });

        AsyncStorage.getItem(CARDS_COUNT).then(value => {
            if (value !== null) {
                setCardCount(Number(value));
            }
        });
        AsyncStorage.getItem(EVERYDAY_CARDS).then(value => {
            if (value !== null) {
                setEveryDayCards(Number(value));
            }
        });
    }, []);

    const completeOnboarding = async () => {
        //setUserId(newUserId);
        await AsyncStorage.setItem(firstLaunchTest, 'true');
        setIsFirstLaunch(false);
    };

    if (isFirstLaunch === null) {
        return null;
    }

    let Navigator = MainNavigator;
    if (isFirstLaunch) {
        Navigator = OnboardingNavigator;
    } else if (isAuthLaunch) {
        Navigator = AuthNavigator;
    }

    console.log('userId', userId);
  return (
      <MainContext.Provider value={{
          userId,
          completeOnboarding,
          cardCount,
          setCardCount,
          everyDayCards,
          setEveryDayCards,
          lives,
          setLives,
      }}>
          <QueryClientProvider client={queryClient}>
              <NavigationContainer>
                  <Navigator />
              </NavigationContainer>
              <Toast />
          </QueryClientProvider>
      </MainContext.Provider>
  );
}

export default App;
