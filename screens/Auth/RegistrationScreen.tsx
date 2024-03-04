import {StackScreenProps} from "@react-navigation/stack";
import {AuthStackParamList} from "../../navigation/AuthNavigator";
import {useState} from "react";
import {BACKGROUND, BLACK, BLOCK_BUTTON, MAIN_SECOND, RED, SECONDARY_SECOND, WHITE} from "../../colors";
import {SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {Quicksand_Bold, Quicksand_Regular} from "../../fonts";

type Props = StackScreenProps<AuthStackParamList, 'RegistrationScreen'>;

const RegistrationScreen = ({ navigation, route }: Props) => {
    const { username, count_cards } = route.params;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    console.log(username, count_cards)
    const handleRegistration = async () => {
        if (!email || !password) {
            setErrorMessage('Please make sure all fields are filled correctly.');
            return;
        }

        // Здесь должна быть логика для отправки данных на сервер

        // Предполагается, что после успешной регистрации происходит переход на другой экран
        // navigation.navigate('NextScreenAfterRegistration');
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
                            //onPress={() => navigation.navigate('SignInScreen')}
                        >
                            <Text style={styles.switchButton}>Sign In</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                <TouchableOpacity
                    style={[styles.continueButton, (!email || !password) && { backgroundColor: BLOCK_BUTTON }]}
                    onPress={handleRegistration}
                    disabled={!email || !password}
                >
                    <Text style={styles.textButton}>
                        Register
                    </Text>
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
});

export default RegistrationScreen;