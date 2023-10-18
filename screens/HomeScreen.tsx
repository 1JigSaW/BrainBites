import React, {useContext, useEffect, useState} from 'react';
import {
    Image,
    SafeAreaView, ScrollView,
    StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import {HomeStackParamList} from "../navigation/HomeStack";
import {StackScreenProps} from "@react-navigation/stack";
import {BACKGROUND, BLACK} from "../colors";
import {Regular} from "../fonts";
import TopicsIcon from "../components/icons/TopicsIcon";
import MyCardsIcon from "../components/icons/MyCardsIcon";
import CountCardsIcon from "../components/icons/CountCardsIcon";
import BrainXPIcon from "../components/icons/BrainXPIcon";
import BadgesIcon from "../components/icons/BadgesIcon";
import ArrowRightIcon from "../components/icons/ArrowRight";

type Props = StackScreenProps<HomeStackParamList, 'HomeScreen'>;

const HomeScreen = ({navigation}: Props) => {

    return (
        <ScrollView style={{ flex: 1, backgroundColor: BACKGROUND }}>
            <SafeAreaView style={styles.safeContainer}>
                <View style={styles.headerContainer}>
                    <View style={styles.iconContainer}>
                        <TopicsIcon size={35} color={BLACK} />
                        <Text style={styles.iconText}>My topics</Text>
                    </View>
                    <View style={styles.iconContainer}>
                        <Image source={{ uri: 'https://cdn.pixabay.com/photo/2018/02/08/22/27/flower-3140492_1280.jpg' }}
                               style={styles.avatar} />
                        <Text style={styles.nameText}>jigsaw</Text>
                    </View>
                    <View style={styles.iconContainer}>
                        <MyCardsIcon size={30} color={BLACK} />
                        <Text style={styles.iconText}>My cards</Text>
                    </View>
                </View>

                <View style={styles.headerContainer}>
                    <View style={styles.iconContainer}>
                        <CountCardsIcon size={35} color={BLACK} />
                        <Text style={styles.textBold}>100</Text>
                        <Text style={styles.textDefault}>Cards</Text>
                    </View>
                    <View style={styles.iconContainer}>
                        <BrainXPIcon size={35} color={BLACK} />
                        <Text style={styles.textBold}>100</Text>
                        <Text style={styles.textDefault}>XP</Text>
                    </View>
                    <View style={styles.iconContainer}>
                        <BadgesIcon size={35} color={BLACK} />
                        <Text style={styles.textBold}>100</Text>
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

                <View style={styles.roundedContainer}>
                    <View style={styles.infoContainer}>
                        <View>
                            <Text style={styles.mainText}>Card Master</Text>
                            <Text style={styles.subText}>Collect 50 cards</Text>
                        </View>
                        <ArrowRightIcon size={40} color={BLACK} />
                    </View>

                    <View style={styles.progressBarBackground}>
                        <View style={styles.progressBarFill} />
                    </View>
                </View>
                <View style={styles.roundedContainer}>
                    <View style={styles.infoContainer}>
                        <View>
                            <Text style={styles.mainText}>Card Master</Text>
                            <Text style={styles.subText}>Collect 50 cards</Text>
                        </View>
                        <ArrowRightIcon size={40} color={BLACK} />
                    </View>

                    <View style={styles.progressBarBackground}>
                        <View style={styles.progressBarFill} />
                    </View>
                </View>

                <View style={styles.roundedContainer}>
                    <View style={styles.infoContainer}>
                        <View>
                            <Text style={styles.mainText}>Card Master</Text>
                            <Text style={styles.subText}>Collect 50 cards</Text>
                        </View>
                        <ArrowRightIcon size={40} color={BLACK} />
                    </View>

                    <View style={styles.progressBarBackground}>
                        <View style={styles.progressBarFill} />
                    </View>
                </View>

                <View style={styles.lineContainer}>
                    <Text style={styles.subtitle}>Leaderboard</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('LeaderBoardScreen')}>
                        <ArrowRightIcon size={25} color={BLACK} />
                    </TouchableOpacity>
                </View>

                <View style={styles.separator} />

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.roundedButton}>
                        <Text style={styles.buttonText}>Cards</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.roundedButton}>
                        <Text style={styles.buttonText}>XP</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.roundedButton}>
                        <Text style={styles.buttonText}>Badges</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.blockNum}>
                    <View style={styles.listItemContainer}>
                        <Text style={styles.listNumber}>#1</Text>
                        <Image source={{ uri: 'https://cdn.pixabay.com/photo/2018/02/08/22/27/flower-3140492_1280.jpg' }} style={styles.listImage} />
                        <Text style={styles.listText}>Item 1</Text>
                        <Text style={styles.listEndNumber}>100</Text>
                    </View>
                    <View style={styles.listSeparator} />
                </View>

            </SafeAreaView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        backgroundColor: BACKGROUND,
        paddingHorizontal: 23,
        paddingVertical: 23,
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
        fontFamily: Regular,
        fontSize: 16,
        color: '#000',
    },
    nameText: {
        fontFamily: Regular,
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
        fontFamily: 'Abel',
        fontSize: 26,
        fontStyle: 'normal',
        fontWeight: '900',
    },
    textDefault: {
        color: '#000',
        fontFamily: 'Abel',
        fontSize: 20,
        fontStyle: 'normal',
        fontWeight: '400',
    },
    lineContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 2
    },
    separator: {
        height: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.20)',  // Цвет линии. Вы можете изменить его по своему желанию
        width: '100%',
        marginBottom: 10,
    },
    subtitle: {
        color: '#000',
        fontFamily: 'Abel',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '700',
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
        fontFamily: 'Abel',
        fontSize: 17,
        fontStyle: 'normal',
        fontWeight: '900',
    },

    subText: {
        color: '#000',
        fontFamily: 'Abel',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '400',
    },

    progressBarBackground: {
        height: 15,
        borderRadius: 10,
        backgroundColor: '#fff', // Цвет фона
        marginTop: 10,
        borderWidth: 1,
    },

    progressBarFill: {
        height: '100%',
        width: '50%', // Положение этой строки меняется в зависимости от вашего прогресса
        borderRadius: 10,
        backgroundColor: 'blue',
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
        fontFamily: 'Abel',
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: '400',
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
        fontFamily: 'Abel',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '400',
        marginRight: 15,
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
        fontFamily: 'Abel',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '400',
    },

    listEndNumber: {
        color: '#000',
        fontFamily: 'Abel',
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: '700',
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
    }
});

export default HomeScreen;
