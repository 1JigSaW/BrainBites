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
import {BACKGROUND, BLACK, BLUE, FIRST_PLACE, MAIN_SECOND, SECOND_PLACE, THIRD_PLACE, WHITE} from "../colors";
import {getButtonStyle, getButtonTextStyle} from "../components/functions/buttonHelpers";
import {useGetUsers} from "../queries/user";
import {SvgUri} from "react-native-svg";
import {Nunito_Bold, Nunito_Regular, Nunito_Semibold, Quicksand_Bold, Quicksand_Regular} from "../fonts";
import FirstPlaceIcon from "../components/icons/FirstPlaceIcon";
import SecondPlaceIcon from "../components/icons/SecondPlaceIcon";
import ThirdPlaceIcon from "../components/icons/ThirdPlaceIcon";
import MainContext from "../navigation/MainContext";

type Props = StackScreenProps<HomeStackParamList, 'LeaderBoardScreen'>;

const LeaderBoardScreen = ({navigation}: Props) => {
    const { userId, cardCount } = useContext(MainContext);
    const [activeButton, setActiveButton] = useState<string>('xp');
    const sortBy = activeButton;
    const returnAll = true


    const {
        data: users,
        isLoading: isLoadingUsers,
        isError: isErrorUsers
    } = useGetUsers({ sortBy, returnAll, userId });

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: BACKGROUND }}>
            <ScrollView style={styles.safeContainer}>
                <View style={{marginBottom: 20}}>
                    {isLoadingUsers ? (
                        <ActivityIndicator size="large" color={BLUE} />
                    ) : (
                        users && users.map((user, index) => (
                            <React.Fragment key={user.id}>
                                <View style={styles.listItemContainer}>
                                     {index === 0 ? <FirstPlaceIcon size={100} color={FIRST_PLACE} style={{marginRight: 19, marginLeft: 7}}/> :
                                        index === 1 ? <SecondPlaceIcon size={100} color={SECOND_PLACE} style={{marginRight: 19, marginLeft: 7}}/> :
                                            index === 2 ? <ThirdPlaceIcon size={100} color={THIRD_PLACE} style={{marginRight: 19, marginLeft: 7}}/> :
                                        <Text style={styles.listNumber}>#{index}</Text>}
                                    <View style={styles.circleImageLeaderboard}>
                                        <SvgUri
                                            style={styles.listImage}
                                            uri={`https://api.dicebear.com/7.x/shapes/svg?seed=${user.username}`}
                                        />
                                    </View>
                                    <Text style={styles.listText}>{user.username}</Text>
                                    <Text style={styles.listEndNumber}>
                                        {sortBy === 'xp' ? user.xp :
                                            sortBy === 'read_cards' ? user.read_cards :
                                                sortBy === 'badges' ? user.badges_count : ''}
                                    </Text>
                                </View>
                            </React.Fragment>
                        ))
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        backgroundColor: MAIN_SECOND,
        margin: 10,
        borderRadius: 20,
        marginTop: 10,
        padding: 10,
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
        paddingTop: 5,
        paddingBottom: 5,
        paddingHorizontal: 10,
        backgroundColor: WHITE,
        marginHorizontal: 10,
        borderRadius: 20,
        marginBottom: 5,
    },

    listNumber: {
        color: '#000',
        fontFamily: Quicksand_Regular,
        fontSize: 14,
        fontStyle: 'normal',
        marginRight: 5,
        width: 35,
    },

    listImage: {
        width: '100%',
        height: '100%',
    },

    listText: {
        flex: 1,
        color: BLACK,
        fontFamily: Quicksand_Regular,
        fontSize: 12,
        fontStyle: 'normal',
    },

    listEndNumber: {
         color: '#000',
        fontFamily: Quicksand_Bold,
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
    circleImageLeaderboard: {
        width: 24,
        height: 24,
        borderRadius: 35,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    }
});

export default LeaderBoardScreen;
