import React, {useEffect, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import MainNavigator from "./navigation/MainNavigator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import OnboardingNavigator from "./navigation/OnboardingNavigator";

const queryClient = new QueryClient();

function App(): JSX.Element | null {

    const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null);

    useEffect(() => {
        AsyncStorage.getItem('firstLaunchTest').then(value => {
            if (value == null) {
                AsyncStorage.setItem('firstLaunchTest', 'true');
                setIsFirstLaunch(true);
            } else {
                setIsFirstLaunch(false);
            }
        });
    }, []);

    if (isFirstLaunch === null) {
        return null;
    }

  return (
      <QueryClientProvider client={queryClient}>
          <NavigationContainer>
              {isFirstLaunch ? <OnboardingNavigator /> : <MainNavigator />}
          </NavigationContainer>
      </QueryClientProvider>
  );
}

export default App;
