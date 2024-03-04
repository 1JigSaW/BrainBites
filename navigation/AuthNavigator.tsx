import {createStackNavigator} from "@react-navigation/stack";
import Launch1Screen from "../screens/Onboarding/Launch1Screen";
import Launch2Screen from "../screens/Onboarding/Launch2Screen";
import Launch3Screen from "../screens/Onboarding/Launch3Screen";
import UsernameScreen from "../screens/Onboarding/UsernameScreen";
import CardCountSelectionScreen from "../screens/Onboarding/CardCountSelectionScreen";
import RegistrationScreen from "../screens/Auth/RegistrationScreen";

export type AuthStackParamList = {
    RegistrationScreen: undefined;
    LoginScreen: undefined
};

const Stack = createStackNavigator<AuthStackParamList>();

const OnboardingNavigator= () => {
    return (
        <Stack.Navigator initialRouteName="RegistrationScreen">
            <Stack.Screen name="RegistrationScreen" component={RegistrationScreen} options={{headerShown: false}}/>
            {/*<Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown: false}}/>*/}
        </Stack.Navigator>
    );
}


export default OnboardingNavigator;