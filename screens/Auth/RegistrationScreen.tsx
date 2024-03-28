import {StackScreenProps} from "@react-navigation/stack";
import {AuthStackParamList} from "../../navigation/AuthNavigator";
import React, {useContext, useState} from "react";
import {BACKGROUND, BLACK, BLOCK_BUTTON, MAIN_SECOND, RED, SECONDARY_SECOND, WHITE} from "../../colors";
import {
    ActivityIndicator,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import {Quicksand_Bold, Quicksand_Regular} from "../../fonts";
import MainContext from "../../navigation/MainContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {user} from "../../constants";
import {useCreateUser, useGoogleSignIn} from "../../queries/user";
import {GoogleSignin, GoogleSigninButton} from "@react-native-google-signin/google-signin";
import Toast from "react-native-toast-message";

type Props = StackScreenProps<AuthStackParamList, 'RegistrationScreen'>;

const RegistrationScreen = ({ navigation, route }: Props) => {
    const {username, everyDayCards, completeAuth, setUserId} = useContext(MainContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isCreatingUser, setIsCreatingUser] = useState(false);

    const { mutate: googleSignInMutate } = useGoogleSignIn();

    const createUserMutation = useCreateUser();
    const handleRegistration = async () => {
        if (!email || !password) {
            setErrorMessage('Please make sure all fields are filled correctly.');
            return;
        }

        const emailValidationRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailValidationRegex.test(email)) {
            setErrorMessage('Please enter a valid email address.');
            setIsCreatingUser(false);
            return;
        }

        if (password.length < 6) {
            setErrorMessage('Password must be at least 6 characters long.');
            setIsCreatingUser(false);
            return;
        }

        setIsCreatingUser(true);

        const avatarUrl = `https://api.dicebear.com/7.x/identicon/svg`;
        if (username) {
            createUserMutation.mutate(
            { username, count_cards: everyDayCards, avatarUrl, email, password },
            {
                onSuccess: async (data) => {
                    try {
                        await AsyncStorage.setItem(user, JSON.stringify(data));
                        setUserId(data.id)
                        completeAuth();
                    } catch (error) {
                        console.error('Ошибка при сохранении данных пользователя:', error);
                    }
                    setIsCreatingUser(false); // Выключить индикатор загрузки
                },
                onError: (error: any) => {
                    setIsCreatingUser(false);
                    setErrorMessage(error?.response?.data?.error || 'Error');
                },
            }
        );
        } else {
            setIsCreatingUser(false);
        }
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
                        const idToken = userInfo.user.id;
                        if (idToken) {
                            googleSignInMutate({ idToken });
                            handleRegistration();
                        }
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
                    <Text style={styles.mainText}>Sign Up</Text>
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

                        {errorMessage !== '' && (
                            <Text style={styles.errorText}>{errorMessage}</Text>
                        )}
                    </View>
                    <View style={styles.switchContainer}>
                        <Text style={styles.switchText}>Already have an account? </Text>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('LoginScreen')}
                        >
                            <Text style={styles.switchButton}>Sign In</Text>
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
                    style={[styles.continueButton, (!email || !password) && { backgroundColor: BLOCK_BUTTON }]}
                    onPress={handleRegistration}
                    disabled={!email || !password || isCreatingUser}
                >
                    {isCreatingUser ? (
                        <ActivityIndicator size="large" color={BACKGROUND} />
                    ) : (
                        <Text style={styles.textButton}>
                            Register
                        </Text>
                    )}
                </TouchableOpacity>
            </View>
        </SafeAreaView>

    );
};


const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        backgroundColor: BACKGROUND,
    },
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
        color: BLACK, // Или другой цвет в зависимости от вашего дизайна
        fontFamily: Quicksand_Regular,
    },
    switchButton: {
        fontSize: 16,
        color: SECONDARY_SECOND, // Используйте цвет, который выделяется и указывает на интерактивность
        fontFamily: Quicksand_Bold,
    },
    centerRow: {
          flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default RegistrationScreen;