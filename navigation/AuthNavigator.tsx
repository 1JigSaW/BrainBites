import {createStackNavigator} from "@react-navigation/stack";
import RegistrationScreen from "../screens/Auth/RegistrationScreen";
import LoginScreen from "../screens/Auth/LoginScreen";

export type AuthStackParamList = {
    RegistrationScreen:undefined;
    LoginScreen: undefined;
};

const Stack = createStackNavigator<AuthStackParamList>();

const OnboardingNavigator= () => {
    return (
        <Stack.Navigator initialRouteName="RegistrationScreen">
            <Stack.Screen name="RegistrationScreen" component={RegistrationScreen} options={{headerShown: false}}/>
            <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown: false}}/>
        </Stack.Navigator>
    );
}


export default OnboardingNavigator;