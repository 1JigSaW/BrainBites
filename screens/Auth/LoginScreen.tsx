import React, { useState, useContext } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    ScrollView, Button,
} from 'react-native';
import {AxiosErrorResponse, useGoogleSignIn, useLoginUser} from '../../queries/user';
import {StackScreenProps} from "@react-navigation/stack";
import {AuthStackParamList} from "../../navigation/AuthNavigator";
import MainContext from "../../navigation/MainContext";
import {BACKGROUND, BLACK, MAIN_SECOND, RED, SECONDARY_SECOND, WHITE} from "../../colors";
import {Quicksand_Bold, Quicksand_Regular} from "../../fonts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {user} from "../../constants";
import {
    GoogleSignin, GoogleSigninButton,
    statusCodes,
} from '@react-native-google-signin/google-signin';
import Config from "react-native-config";
import Toast from "react-native-toast-message";

type Props = StackScreenProps<AuthStackParamList, 'LoginScreen'>;

const LoginScreen = ({ navigation }: Props) => {
    const {completeAuth, setUsername, setEveryDayCards, setLives} = useContext(MainContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { mutate: loginUser, isLoading, isError, error } = useLoginUser();
    const { mutate: googleSignInMutate } = useGoogleSignIn();
    const handleLogin = () => {
        loginUser({ email, password }, {
            onSuccess: async (data: any) => {
                try {
                    console.log(data.user)
                    setUsername(data.user?.username);
                    setLives(data.user?.lives);
                    await AsyncStorage.setItem(user, JSON.stringify(data.user));
                    completeAuth();
                } catch (error) {
                    console.error('Ошибка при сохранении данных пользователя:', error);
                }
            },
        });
    };

    const google_signIn = () => {
        GoogleSignin.configure({
            webClientId: '534979316884-dhc3g928q1nun7m6kdf6itacfdqad370.apps.googleusercontent.com',
            iosClientId: '534979316884-6m9hcnm32nmn5sff14sfkmm05nna7m47.apps.googleusercontent.com',
            offlineAccess: true,
            forceCodeForRefreshToken: true,
        });
        GoogleSignin.hasPlayServices().then((hasPlayService) => {
                if (hasPlayService) {
                     GoogleSignin.signIn().then((userInfo) => {
                         console.log(userInfo);
                        const idToken = userInfo.user.id;
                        console.log(userInfo)
                        if (idToken) {
                            console.log(2)
                            googleSignInMutate({ idToken });
                            handleLogin();
                        }
                        console.log(3)
                     }).catch((e) => {
                        console.log("ERROR IS: " + JSON.stringify(e));
                        Toast.show({
                            type: 'error',
                            text1: 'Error',
                            text2: 'Something went wrong'
                        });
                     })
                }
            }).catch((e) => {
                console.log("ERROR IS: " + JSON.stringify(e));
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: 'Something went wrong'
                });
            })
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: BACKGROUND }}>
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                    <Text style={styles.mainText}>Sign In</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            keyboardType="email-address"
                            value={email}
                            onChangeText={setEmail}
                        />
                        <TextInput
                            style={[styles.input, {marginBottom: 0}]}
                            placeholder="Password"
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}
                        />
                        <TouchableOpacity onPress={() => {/* Здесь логика для восстановления пароля */}}>
                            <Text style={[styles.forgotButton, {marginTop: 5}]}>Forgot Password?</Text>
                        </TouchableOpacity>
                        {isError && (
                            <Text style={styles.errorText}>{(error as any)?.response?.data?.error || 'Login failed'}</Text>
                        )}
                    </View>

                    <View style={styles.switchContainer}>
                        <Text style={styles.switchText}>Don't have an account? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('RegistrationScreen')}>
                            <Text style={styles.switchButton}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.centerRow}>
                        <GoogleSigninButton
                          size={GoogleSigninButton.Size.Icon}
                          color={GoogleSigninButton.Color.Light}
                          onPress={google_signIn}
                        />
                    </View>
                </ScrollView>
                    <TouchableOpacity
                        style={styles.continueButton}
                        onPress={handleLogin}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <ActivityIndicator size="large" color="#FFF" />
                        ) : (
                            <Text style={styles.textButton}>
                                Sign In
                            </Text>
                        )}
                    </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: MAIN_SECOND,
        margin: 15,
        borderRadius: 20,
    },
    inputContainer: {
        width: '100%',
        paddingHorizontal: 20,
    },
    input: {
        width: '100%',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderColor: BLACK,
        backgroundColor: WHITE,
        borderRadius: 20,
        fontSize: 18,
        fontFamily: Quicksand_Regular,
        marginBottom: 15,
    },
    continueButton: {
        marginHorizontal: 25,
        marginBottom: 20,
        borderRadius: 20,
        backgroundColor: SECONDARY_SECOND,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
    },
    textButton: {
        fontSize: 18,
        color: WHITE,
        fontFamily: Quicksand_Regular,
    },
    mainText: {
        color: BLACK,
        fontSize: 24,
        fontFamily: Quicksand_Bold,
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    errorText: {
        color: RED,
        textAlign: 'center',
        width: '100%',
        fontFamily: Quicksand_Regular,
        fontSize: 16,
    },
    switchContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
    },
    switchText: {
        fontSize: 16,
        color: BLACK,
        fontFamily: Quicksand_Regular,
    },
    switchButton: {
        fontSize: 16,
        color: SECONDARY_SECOND,
        fontFamily: Quicksand_Bold,
    },
    forgotButton: {
        marginLeft: 10,
        fontSize: 16,
        color: SECONDARY_SECOND,
        fontFamily: Quicksand_Bold,
    },
    centerRow: {
          flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default LoginScreen;
