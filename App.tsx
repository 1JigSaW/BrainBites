import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import MainNavigator from "./navigation/MainNavigator";

const queryClient = new QueryClient();

function App(): JSX.Element {
  return (
      <QueryClientProvider client={queryClient}>
          <NavigationContainer>
              <MainNavigator />
          </NavigationContainer>
      </QueryClientProvider>
  );
}

export default App;
