import React, { useState, useContext } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    ScrollView, Button, Modal,
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
import GoogleIcon from "../../components/icons/GoogleIcon";

type Props = StackScreenProps<AuthStackParamList, 'LoginScreen'>;

const LoginScreen = ({ navigation }: Props) => {
    const {completeAuth, setUsername, setEveryDayCards, setLives, setUserId} = useContext(MainContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSigningIn, setIsSigningIn] = useState(false);
    const { mutate: loginUser, isLoading, isError, error } = useLoginUser();
    const { mutate: googleSignInMutate } = useGoogleSignIn();
    const [loading, setLoading] = useState(false);
    const [isUpdatingXp, setIsUpdatingXp] = useState(false);
    const [isUpdatingLives, setIsUpdatingLives] = useState(false);


    const handleLogin = () => {
        setLoading(true);
        loginUser({ email, password }, {
            onSuccess: async (data: any) => {
                try {
                    console.log(data.user)
                    setUserId(data.id)
                    setUsername(data.user?.username);
                    setLives(data.user?.lives);
                    await AsyncStorage.setItem(user, JSON.stringify(data.user));
                    setLoading(false);
                    completeAuth();
                } catch (error) {
                    setLoading(false);
                    console.error('Ошибка при сохранении данных пользователя:', error);
                }
            },
        });
    };

    const handleGoogleLogin = ({ idToken }: any) => {
        setLoading(true);
        console.log('loading', loading);
        googleSignInMutate({ idToken }, {
            onSuccess: async (data) => {
                try {
                    console.log("Received data: ", data);
                    setUserId(data.user.id);
                    await AsyncStorage.setItem(user, JSON.stringify(data.user));
                    completeAuth();
                    setLoading(false);
                    console.log(111)
                } catch (error) {
                    setLoading(false);
                    console.error('Ошибка при сохранении данных пользователя:', error);
                }
            },
            onError: (error) => {
                setLoading(false);
                console.error("Login error: ", error);
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: error.message || 'Something went wrong'
                });
            },
        });
    };


    const google_signIn = async () => {
        if (isSigningIn) {
            console.log("Sign-in process is already in progress.");
            return;
        }
        setIsSigningIn(true);
        setLoading(true);

        GoogleSignin.configure({
            webClientId: '534979316884-vgh9lg4k7tb1q7kg527ra34rftp9sof4.apps.googleusercontent.com',
            iosClientId: '534979316884-6m9hcnm32nmn5sff14sfkmm05nna7m47.apps.googleusercontent.com',
        });

        try {
            const hasPlayService = await GoogleSignin.hasPlayServices();
            if (!hasPlayService) {
                console.error("Play services are not available.");
                return;
            }

            const isSignedIn = await GoogleSignin.isSignedIn();
            if (!isSignedIn) {
                const userInfo = await GoogleSignin.signIn();
                console.log(userInfo);
                const idToken = userInfo.idToken;
                if (idToken) {
                    handleGoogleLogin({ idToken });
                }
            } else {
                console.log("User already signed in. Getting current user info...");
                const currentUserInfo = await GoogleSignin.getCurrentUser();
                console.log(currentUserInfo);
                const idToken = currentUserInfo?.idToken;
                if (idToken) {
                    handleGoogleLogin({ idToken });
                }
            }
        } catch (e) {
            console.error("Google Sign-In error: ", e);
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Something went wrong with Google Sign-In'
            });
        } finally {
            setIsSigningIn(false);
        }
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
                        <TouchableOpacity
                            style={styles.googleWrap}
                            onPress={google_signIn}
                        >
                            <GoogleIcon size={100}/>
                        </TouchableOpacity>
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
            {loading && (
                <View style={styles.overlay}>
                    <ActivityIndicator size="large" color="#FFF" />
                </View>
            )}
        </SafeAreaView>
    );
};

const styles= StyleSheet.create({
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
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
    },
    googleWrap: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: BACKGROUND,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default LoginScreen;
