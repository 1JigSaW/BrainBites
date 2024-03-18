import {StackScreenProps} from "@react-navigation/stack";
import {HomeStackParamList} from "../navigation/HomeStack";
import {
    ActivityIndicator, Dimensions,
    Image,
    SafeAreaView, ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import {
    BACKGROUND,
    BLACK,
    BLUE, CORRECT_ANSWER,
    FIRST_PLACE, INCORRECT_ANSWER,
    MAIN_SECOND,
    RED_SECOND,
    SECOND_PLACE, SECONDARY_SECOND,
    THIRD_PLACE,
    WHITE
} from "../colors";
import {SvgUri} from "react-native-svg";
import Brain2Icon from "../components/icons/Brain2Icon";
import HeartIcon from "../components/icons/HeartIcon";
import PlusIcon from "../components/icons/PlusIcon";
import WeeklyProgressBar from "../components/WeeklyProgressBar";
import React, {useContext, useEffect, useState} from "react";
import {useGetUserStats} from "../queries/user";
import MainContext from "../navigation/MainContext";
import {Nunito_Bold, Nunito_Regular, Quicksand_Bold, Quicksand_Regular} from "../fonts";
import EditIcon from "../components/icons/EditIcon";
import LogoutIcon from "../components/icons/LogoutIcon";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {authLaunch, CARDS_COUNT, EVERYDAY_CARDS, firstLaunchTest, user, USERNAME} from "../constants";
import FirstPlaceIcon from "../components/icons/FirstPlaceIcon";
import SecondPlaceIcon from "../components/icons/SecondPlaceIcon";
import ThirdPlaceIcon from "../components/icons/ThirdPlaceIcon";
import {useGetUserBadgeProgress} from "../queries/badge";
import {calculateProgressBarWidth} from "../utils";
import PieChart from "react-native-pie-chart";
import {VictoryPie} from "victory-native";

type Props = StackScreenProps<HomeStackParamList, 'ProfileScreen'>;

const data = [
  { quarter: 1, earnings: 13000 },
  { quarter: 2, earnings: 16500 },
  { quarter: 3, earnings: 14250 },
  { quarter: 4, earnings: 19000 }
];

const ProfileScreen = ({ navigation, route }: Props) => {
    const { setIsAuthLaunch, setUsername, setIsFirstLaunch, setLives, setEveryDayCards, setCardCount } = useContext(MainContext);
    const widthAndHeight = 250
    const series = [123, 321, 123, 789, 537]
    const sliceColor = ['#fbd203', '#ffb300', '#ff9100', '#ff6c00', '#ff3c00']


    const { userId, cardCount } = useContext(MainContext);
    const [isEditing, setIsEditing] = useState(false);
    const [usernameEdit, setUsernameEdit] = useState('');
    const {
        data: userStats,
        isLoading: isLoadingStats,
        isError,
        refetch,
    } = useGetUserStats(userId);

    const shouldFetchBadgeProgress = userId != null;

    const { data: badgeProgress, isLoading, error } = useGetUserBadgeProgress(userId, shouldFetchBadgeProgress, true);


    useEffect(() => {
        if (userStats?.username) {
            setUsernameEdit(userStats.username);
        }
    }, [userStats?.username]);

    const handleEditIconPress = () => {
        setIsEditing(true);
    };

    const handleSavePress = () => {
        setIsEditing(false);
    };

    const logoutHandle = async () => {
        await AsyncStorage.removeItem(authLaunch);
        await AsyncStorage.removeItem(user);
        await AsyncStorage.removeItem(CARDS_COUNT);
        await AsyncStorage.removeItem(EVERYDAY_CARDS);
        await AsyncStorage.removeItem(USERNAME);
        await AsyncStorage.removeItem(firstLaunchTest);
        setIsAuthLaunch(true);
        setIsFirstLaunch(true);
        setLives(0);
        setUsername('');

    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: BACKGROUND }}>
            <ScrollView>
                <View style={styles.header}>
                    <View style={styles.headerLine1}>
                        <View style={styles.centerRow}>
                            <View style={styles.circleImageView}>
                                <SvgUri
                                    style={styles.circleImage}
                                    uri={`https://api.dicebear.com/7.x/shapes/svg?seed=${userStats?.username}`}
                                />
                            </View>
                            <View style={styles.centerRow}>
                                {/*{isEditing ? (*/}
                                {/*    <>*/}
                                {/*        <TextInput*/}
                                {/*            value={username}*/}
                                {/*            onChangeText={setUsername}*/}
                                {/*            style={styles.textInput}*/}
                                {/*        />*/}
                                {/*        <TouchableOpacity onPress={handleSavePress}>*/}
                                {/*            <Text>Save</Text>*/}
                                {/*        </TouchableOpacity>*/}
                                {/*    </>*/}
                                {/*) : (*/}
                                {/*    <>*/}
                                {/*        <Text style={styles.textUsername}>{userStats?.username}</Text>*/}
                                {/*        <TouchableOpacity onPress={handleEditIconPress} style={styles.whiteCircle}>*/}
                                {/*            <EditIcon size={100} color="BLACK"/>*/}
                                {/*        </TouchableOpacity>*/}
                                {/*    </>*/}
                                {/*)}*/}
                                <Text style={styles.textUsername}>{userStats?.username}</Text>
                                {/*<TouchableOpacity onPress={handleEditIconPress} style={styles.whiteCircle}>*/}
                                {/*    <EditIcon size={100} color={BLACK} />*/}
                                {/*</TouchableOpacity>*/}
                            </View>
                        </View>
                        <TouchableOpacity onPress={logoutHandle}>
                            <LogoutIcon size={100} color={BLACK} style={{marginRight: 20, marginTop: 5}} />
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity style={styles.achievementContainer} onPress={() => navigation.navigate('AchievementsScreen')}>
                    <Text style={styles.titleAchievement}>Achievements</Text>
                    <View style={styles.blockNum}>
                        {isLoading ? (
                            <ActivityIndicator size="large" color={BLUE} />
                        ) : (
                            badgeProgress?.map((badge, index) => (
                                <View key={index} style={styles.roundedContainer}>
                                    <View style={styles.infoContainer}>
                                        <Image source={{ uri: badge.image }} width={50} height={45}/>
                                        <View style={{width: '85%', marginLeft: 10}}>
                                            <Text style={styles.mainText}>{badge.name}</Text>
                                            <Text style={styles.subText}>{badge.description}</Text>
                                        </View>
                                    </View>

                                    <View style={styles.progressBarBackground}>
                                        <View style={[styles.progressBarFill, { width: calculateProgressBarWidth(badge.progress_number, badge.criteria) as any }]} />
                                    </View>
                                </View>
                            ))
                        )}
                    </View>
                </TouchableOpacity>
                <View style={styles.statsContainer}>
                    <Text style={styles.titleAchievement}>Stats</Text>
                    <View style={styles.statBlock}>
                        <Text style={styles.statTitle}>Answers</Text>
                        <View style={styles.chartContainer}>
                            <View>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <View style={{
                                         width: 10,
                                        height: 10,
                                        borderRadius: 5,
                                        backgroundColor: INCORRECT_ANSWER,
                                        marginTop: 3,
                                        marginRight: 5
                                    }}>
                                    </View>
                                    <Text style={{fontSize: 12, fontFamily: Quicksand_Bold, color: BLACK}}>Incorrect</Text>
                                </View>
                                <Text style={{fontSize: 24, fontFamily: Quicksand_Bold, color: BLACK, marginLeft: 20, marginTop: -5}}>24</Text>
                            </View>
                            <VictoryPie
                                width={100}
                                height={100}
                                colorScale={[INCORRECT_ANSWER, CORRECT_ANSWER]}
                                radius={({ datum }) => (datum.y > 20 ? 50 : 50)}
                                labels={({ datum }) => null}
                                style={{
                                  labels: { fill: "white", fontSize: 15, fontWeight: "bold" },
                                  data: {
                                    fillOpacity: 0.9, stroke: "white", strokeWidth: 3
                                  }
                                }}
                                cornerRadius={({ datum }) => datum.y > 30 ? 10 : 10}
                                padAngle={({ datum }) => datum.y > 30 ? 2 : 0}

                                data={[
                                    { x: "Cats", y: 45 },
                                    { x: "Dogs", y: 10 },
                                ]}
                            />
                            <View>
                                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                                    <View style={{
                                        width: 10,
                                        height: 10,
                                        borderRadius: 5,
                                        backgroundColor: CORRECT_ANSWER,
                                        marginTop: 3,
                                        marginRight: 5,
                                    }}>
                                    </View>
                                    <Text style={{fontSize: 12, fontFamily: Quicksand_Bold, color: BLACK}}>Correct</Text>
                                </View>
                                <Text style={{fontSize: 24, fontFamily: Quicksand_Bold, color: BLACK, marginLeft: 20,  marginTop: -5}}>24</Text>
                            </View>
                        </View>
                        <Text style={styles.statTotal}>Total</Text>
                        <Text style={{
                            fontSize: 24,
                            color: BLACK,
                            fontFamily: Quicksand_Bold,
                            textAlign: 'center',
                            marginTop: -5
                        }}>24</Text>
                    </View>
                    <View style={styles.statBlock}>
                        <Text style={styles.statTitle}>Streak without mistakes</Text>
                        <View style={styles.streakCircle}>
                            <Text style={styles.streakNumber}>23</Text>
                        </View>
                    </View>
                    <View style={styles.statBlock}>
                        <Text style={styles.statTitle}>Maximum cards in a day</Text>
                        <View style={styles.maxCardsCircle}>
                            <Text style={styles.maxCardsNumber}>23</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
     header: {
         backgroundColor: MAIN_SECOND,
         borderRadius: 20,
         marginHorizontal: 10,
         marginTop: 10,
    },
    headerLine1: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    centerRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    circleImageView: {
        width: 60,
        height: 60,
        borderRadius: 35,
        overflow: 'hidden',
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    circleImage: {
        width: '100%',
        height: '100%',
    },
    textUsername: {
        fontSize: 24,
        color: BLACK,
        fontFamily: Quicksand_Regular,
        marginLeft: 5,
    },
    iconsContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        marginLeft: 10,
        marginRight: 20,
        marginTop: 5
    },
    textVariable: {
        fontSize: 24,
        color: BLACK,
        fontFamily: Quicksand_Regular,
    },
    circle: {
        width: 25,
        height: 25,
        borderRadius: 60,
        backgroundColor: WHITE,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 5,
        marginTop: 5
    },
    whiteCircle: {
         width: 20,
         height: 20,
        borderRadius: 10,
        backgroundColor: WHITE,
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 5,
        marginTop: 7,
    },
    textInput: {
        fontSize: 24,
        color: BLACK,
        fontFamily: Quicksand_Regular,
        marginLeft: 5,
        borderBottomWidth: 1,
        borderBottomColor: BLACK,
        marginRight: 10,
    },
    achievementContainer: {
        backgroundColor: MAIN_SECOND,
        marginTop: 10,
        borderRadius: 20,
        marginHorizontal: 10,
    },
    titleAchievement: {
        color: BLACK,
        fontSize: 24,
        fontFamily: Quicksand_Bold,
        textAlign: "center",
        marginTop: 10,
        marginBottom: 10
    },
    roundedContainer: {
        backgroundColor: 'white',
        borderRadius: 15,
        marginBottom: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginHorizontal: 10,
    },

    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    mainText: {
        color: BLACK,
        fontFamily: Quicksand_Bold,
        fontSize: 18,
        fontStyle: 'normal',
    },

    subText: {
        color: BLACK,
        fontFamily: Quicksand_Regular,
        fontSize: 14,
        fontStyle: 'normal',
    },

    progressBarBackground: {
        height: 20,
        borderRadius: 10,
        backgroundColor: '#fff',
        marginTop: 10,
        borderWidth: 5,
        borderColor: MAIN_SECOND
    },

    progressBarFill: {
        height: '100%',
        width: '50%',
        borderRadius: 10,
        backgroundColor: SECONDARY_SECOND,
    },
    blockNum: {
        marginBottom: 10,
    },
    statsContainer: {
        backgroundColor: MAIN_SECOND,
        marginTop: 10,
        borderRadius: 20,
        marginHorizontal: 10,
    },
    statBlock: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 20,
        marginBottom: 20,
        marginHorizontal: 10
    },
    statTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000',
        marginBottom: 10,
    },
    chartContainer: {
        height: 150,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    streakCircle: {
        height: 100,
        width: 100,
        borderRadius: 50,
        backgroundColor: '#FDE8E9',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    streakNumber: {
        fontSize: 28,
        color: '#FB6C71',
        fontWeight: 'bold',
    },
    maxCardsCircle: {
        height: 100,
        width: 100,
        borderRadius: 50,
        backgroundColor: '#D6F0F7',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    maxCardsNumber: {
        fontSize: 28,
        color: '#6FA8DC',
        fontWeight: 'bold',
    },
    statTotal: {
        fontSize: 12,
        color: BLACK,
        fontFamily: Quicksand_Bold,
        textAlign: 'center',
        marginTop: -5
    },
    chartStyle: {
        marginVertical: 8,
        borderRadius: 16,
      },
});

export default ProfileScreen;