import React, {useContext, useEffect, useState} from 'react';
import {
    ActivityIndicator,
    Image, Platform,
    SafeAreaView, ScrollView,
    StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import {HomeStackParamList} from "../navigation/HomeStack";
import {StackScreenProps} from "@react-navigation/stack";
import {BACKGROUND, BLACK, BLUE} from "../colors";
import {Nunito_Bold, Nunito_Regular, Nunito_Semibold, Regular} from "../fonts";
import TopicsIcon from "../components/icons/TopicsIcon";
import MyCardsIcon from "../components/icons/MyCardsIcon";
import CountCardsIcon from "../components/icons/CountCardsIcon";
import BrainXPIcon from "../components/icons/BrainXPIcon";
import BadgesIcon from "../components/icons/BadgesIcon";
import ArrowRightIcon from "../components/icons/ArrowRight";
import {getButtonStyle, getButtonTextStyle} from "../components/functions/buttonHelpers";


type Props = StackScreenProps<HomeStackParamList, 'HomeScreen'>;

import MainContext from "../navigation/MainContext";
import {useGetUsers, useGetUserStats} from "../queries/user";
import {useIsFocused} from "@react-navigation/native";
import {useUpdateReadCardsCount} from "../queries/card";
import {useGetUserBadgeProgress} from "../queries/badge";
import {calculateProgressBarWidth} from "../utils";
import {SvgUri} from "react-native-svg";

const getFontSizeForName = (name: string) => {
    if (name.length <= 5) {
        return 20; // Large font size for short names
    } else if (name.length <= 20) {
        return 16; // Medium font size for medium-length names
    } else {
        return 12; // Small font size for long names
    }
};

const HomeScreen = ({ navigation, route }: Props) => {
    const [activeButton, setActiveButton] = useState<string>('read_cards');
    const isFocused = useIsFocused(); // Этот хук возвращает true, когда экран в фокусе
    const { userId, cardCount } = useContext(MainContext);
    const shouldFetchBadgeProgress = userId != null;
    const { data: badgeProgress, isLoading, error, refetch: refetchBadge } = useGetUserBadgeProgress(userId, shouldFetchBadgeProgress, true);
    const {
        data: userStats,
        isLoading: isLoadingStats,
        isError,
        refetch,
    } = useGetUserStats(userId);

    console.log('userStats', userStats)

    const sortBy = activeButton;
    const returnAll = false;

    const {
        data: users,
        isLoading: isLoadingUsers,
        isError: isErrorUsers
    } = useGetUsers({ sortBy, returnAll, userId });


    const { mutate: updateReadCardsCount } = useUpdateReadCardsCount();

    useEffect(() => {
        if (isFocused && userId) {
            refetch();
            refetchBadge();
            updateReadCardsCount({
                userId,
                readCardsCount: cardCount,
            });
        }
    }, [isFocused, userId, refetch, cardCount, updateReadCardsCount]);

    console.log(1)
    return (
        <SafeAreaView style={styles.safeContainer}>
        <ScrollView style={{
            flex: 1,
            backgroundColor: BACKGROUND,
            paddingHorizontal: 23,
            marginBottom: 20,
            }}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity
                        style={styles.iconContainer}
                        onPress={() => {
                            // Make sure userStats is defined and has a 'topics' property before navigating
                            if (userStats?.topics) {
                                navigation.navigate('MyTopicsScreen', { topics: userStats.topics });
                            } else {
                                console.error('User stats or topics are undefined');
                            }
                        }}
                    >
                        <TopicsIcon size={35} color={BLACK} />
                        <Text style={styles.iconText}>My topics</Text>
                    </TouchableOpacity>
                    <View style={styles.iconContainer}>
                        {/*<Image*/}
                        {/*    source={{ uri: 'https://api.dicebear.com/7.x/identicon/svg' }}*/}
                        {/*    style={styles.avatar}*/}
                        {/*/>*/}

                        {/*{userStats && <Avvvatars value={userStats.username} />}*/}
                        <SvgUri
                            style={styles.avatar}
                            uri={`https://api.dicebear.com/7.x/shapes/svg?seed=${userStats?.username}`}
                        />
                        <Text
                            style={[
                                styles.nameText,
                                { fontSize: getFontSizeForName(userStats?.username || '') }
                            ]}
                        >
                            {userStats?.username}
                        </Text>
                    </View>
                    <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('MyCardsScreen')}>
                        <MyCardsIcon size={30} color={BLACK} />
                        <Text style={styles.iconText}>My cards</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.headerContainer}>
                    <View style={styles.iconContainer}>
                        <CountCardsIcon size={35} color={BLACK} />
                        <Text style={styles.textBold}>{cardCount}</Text>
                        <Text style={styles.textDefault}>Cards</Text>
                    </View>
                    <View style={styles.iconContainer}>
                        <BrainXPIcon size={35} color={BLACK} />
                        <Text style={styles.textBold}>{userStats?.xp}</Text>
                        <Text style={styles.textDefault}>XP</Text>
                    </View>
                    <View style={styles.iconContainer}>
                        <BadgesIcon size={35} color={BLACK} />
                        <Text style={styles.textBold}>{userStats?.earned_badges_count}</Text>
                        <Text style={styles.textDefault}>Badges</Text>
                    </View>
                </View>

                <View style={styles.lineContainer}>
                    <Text style={styles.subtitle}>Upcoming Achievements</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('AchievementsScreen')}>
                        <ArrowRightIcon size={25} color={BLACK} />
                    </TouchableOpacity>
                </View>

                <View style={styles.separator} />

                {isLoading ? (
                    <ActivityIndicator size="large" color={BLUE} />
                ) : (
                    badgeProgress?.map((badge, index) => (
                        <View key={index} style={styles.roundedContainer}>
                            <View style={styles.infoContainer}>
                                <View style={{width: '85%'}}>
                                    <Text style={styles.mainText}>{badge.name}</Text>
                                    <Text style={styles.subText}>{badge.description}</Text>
                                </View>
                                <Image source={{ uri: badge.image }} width={45} height={40}/>
                            </View>

                            <View style={styles.progressBarBackground}>
                                <View style={[styles.progressBarFill, { width: calculateProgressBarWidth(badge.progress_number, badge.criteria) as any }]} />
                            </View>
                        </View>
                    ))
                )}

                <View style={styles.lineContainer}>
                    <Text style={styles.subtitle}>Leaderboard</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('LeaderBoardScreen')}>
                        <ArrowRightIcon size={25} color={BLACK} />
                    </TouchableOpacity>
                </View>

                <View style={styles.separator} />

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
                <View style={styles.blockNum}>
                    {isLoadingUsers ? (
                        <ActivityIndicator size="large" color={BLUE} />
                    ) : (
                        users && users.map(user => (
                            <React.Fragment key={user.id}>
                                <View style={styles.listItemContainer}>
                                    <Text style={styles.listNumber}>#{user.user_rank}</Text>

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



            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        backgroundColor: BACKGROUND,
        ...Platform.select({
            ios: {
                padding: 23,
            }})
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 10,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconContainer: {
        width: 80,
        alignItems: 'center',
        flexDirection: 'column',
    },
    avatarIcon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginBottom: 5,
    },
    otherIcon: {
        width: 40,
        height: 40,
        marginBottom: 5,
    },
    iconText: {
        fontFamily: Nunito_Regular,
        fontSize: 16,
        color: '#000',
    },
    nameText: {
        fontFamily: Nunito_Regular,
        fontSize: 24,
        color: '#000',
    },
    avatar: {
        width: 70,
        height: 70,
        borderRadius: 35,
        marginBottom: 5,
    },
    textBold: {
        color: '#000',
        fontFamily: Nunito_Bold,
        fontSize: 28,
    },
    textDefault: {
        color: '#000',
        fontFamily: Nunito_Semibold,
        fontSize: 20,
    },
    lineContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 2
    },
    separator: {
        height: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.20)',
        width: '100%',
        marginBottom: 10,
    },
    subtitle: {
        color: '#000',
        fontFamily: Nunito_Bold,
        fontSize: 20,
        fontStyle: 'normal',
    },
    roundedContainer: {
        backgroundColor: 'white',
        borderRadius: 15,
        marginBottom: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        borderWidth: 1,
    },

    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    mainText: {
        color: '#000',
        fontFamily: Nunito_Bold,
        fontSize: 20,
        fontStyle: 'normal',
    },

    subText: {
        color: '#000',
        fontFamily: Nunito_Regular,
        fontSize: 16,
        fontStyle: 'normal',
    },

    progressBarBackground: {
        height: 15,
        borderRadius: 10,
        backgroundColor: '#fff',
        marginTop: 10,
        borderWidth: 1,
    },

    progressBarFill: {
        height: '100%',
        width: '50%',
        borderRadius: 10,
        backgroundColor: BLUE,
    },

    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
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
        color: BLACK,
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
        fontSize: 14,
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
        fontSize: 14,
        fontStyle: 'normal',
    },

    listEndNumber: {
        color: '#000',
        fontFamily: Nunito_Bold,
        fontSize: 20,
        fontStyle: 'normal',
        marginLeft: 15,
    },

    listSeparator: {
        height: 1,
        backgroundColor: 'black',
        marginLeft: 10,
        marginRight: 10,
    },
    blockNum: {
        marginBottom: 30,
    },
    activeButton: {
        backgroundColor: BLUE,
        borderColor: BLUE,
    },
    activeButtonText: {
        color: BACKGROUND,
    },
});

export default HomeScreen;
