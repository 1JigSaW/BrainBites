import React, {useContext, useEffect, useState} from 'react';
import {
    ActivityIndicator,
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import {HomeStackParamList} from "../navigation/HomeStack";
import {StackScreenProps} from "@react-navigation/stack";
import {BACKGROUND, BLACK, BLUE} from "../colors";
import {getButtonStyle, getButtonTextStyle} from "../components/functions/buttonHelpers";
import {useGetUsers} from "../queries/user";
import {SvgUri} from "react-native-svg";
import {Nunito_Bold, Nunito_Regular, Nunito_Semibold} from "../fonts";

type Props = StackScreenProps<HomeStackParamList, 'LeaderBoardScreen'>;

const LeaderBoardScreen = ({navigation}: Props) => {
    const [activeButton, setActiveButton] = useState<string>('read_cards');
    const sortBy = activeButton;
    const returnAll = true


    const {
        data: users,
        isLoading: isLoadingUsers,
        isError: isErrorUsers
    } = useGetUsers({ sortBy, returnAll });;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: BACKGROUND }}>
            <ScrollView style={styles.safeContainer}>
                <View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={getButtonStyle('read_cards', activeButton, styles)}
                            onPress={() => setActiveButton('read_cards')}
                        >
                            <Text style={getButtonTextStyle('read_cards', activeButton, styles)}>Cards</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={getButtonStyle('xp', activeButton, styles)}
                            onPress={() => setActiveButton('xp')}
                        >
                            <Text style={getButtonTextStyle('xp', activeButton, styles)}>XP</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={getButtonStyle('badges', activeButton, styles)}
                            onPress={() => setActiveButton('badges')}
                        >
                            <Text style={getButtonTextStyle('badges', activeButton, styles)}>Badges</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        {isLoadingUsers ? (
                            <ActivityIndicator size="large" color={BLUE} />
                        ) : (
                            users && users.map((user, index) => (
                                <React.Fragment key={user.id}>
                                    <View style={styles.listItemContainer}>
                                        <Text style={styles.listNumber}>#{index+1}</Text>
                                        <SvgUri
                                            style={styles.listImage}
                                            uri={`https://api.dicebear.com/7.x/shapes/svg?seed=${user.username}`}
                                        />
                                        <Text style={styles.listText}>{user.username}</Text>
                                        <Text style={styles.listEndNumber}>
                                            {sortBy === 'xp' ? user.xp :
                                                sortBy === 'read_cards' ? user.read_cards :
                                                    sortBy === 'badges' ? user.badges_count : ''}
                                        </Text>
                                    </View>
                                    {users.indexOf(user) < users.length - 1 && <View style={styles.listSeparator} />}
                                </React.Fragment>
                            ))
                        )}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        backgroundColor: BACKGROUND,
        paddingHorizontal: 23,
        paddingVertical: 5,
        marginBottom: 50,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    roundedButton: {
        flex: 1,
        backgroundColor: '#fff',
        paddingVertical: 2,
        borderRadius: 20,
        alignItems: 'center',
        marginHorizontal: 5,
        borderWidth: 1,
    },

    buttonText: {
        color: '#000',
        fontFamily: Nunito_Semibold,
        fontSize: 20,
        fontStyle: 'normal',
    },
    listItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 15,
        paddingBottom: 5,
        paddingHorizontal: 10,
    },

    listNumber: {
        color: '#000',
        fontFamily: Nunito_Regular,
        fontSize: 16,
        fontStyle: 'normal',
        marginRight: 15,
        width: 35
    },

    listImage: {
        width: 28,
        height: 28,
        borderRadius: 20,
        marginRight: 15,
    },

    listText: {
        flex: 1,
        color: '#000',
        fontFamily: Nunito_Regular,
        fontSize: 16,
        fontStyle: 'normal',
    },

    listEndNumber: {
        color: '#000',
        fontFamily: Nunito_Bold,
        fontSize: 18,
        fontStyle: 'normal',
        marginLeft: 15,
    },

    listSeparator: {
        height: 1,
        backgroundColor: BLACK,
        marginLeft: 10,
        marginRight: 10,
    },
    activeButton: {
        backgroundColor: BLUE,
        borderColor: BLUE,
    },
    activeButtonText: {
        color: BACKGROUND,
    },
});

export default LeaderBoardScreen;
