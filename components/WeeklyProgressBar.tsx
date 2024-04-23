import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import {BACKGROUND, BLACK, BLOCK_BUTTON, INCORRECT_ANSWER, MAIN_SECOND, RED, WHITE} from "../colors";
import {Quicksand_Bold, Quicksand_Regular} from "../fonts";
import LottieView from "lottie-react-native";
import FireIcon from "./icons/FireIcon";

const screenWidth = Dimensions.get('window').width;

const WeeklyProgressBar = ({ total, progress }: any) => {
  const days = ['1', '2', '3', '4', '5', '6', '7'];
  console.log('progress', progress);

  // Если progress больше 7, начинаем счет заново
  const normalizedProgress = progress % 7;

  return (
    <View style={styles.container}>
      <View style={styles.circle}>
        <FireIcon size={100} style={{ overflow: 'hidden', position: 'absolute', left: -13, top: -28, zIndex: 0 }} />
        <Text style={{ fontFamily: 'Quicksand_Bold', fontSize: 24, color: BACKGROUND, fontWeight: 'bold', zIndex: 1 }}>{total}</Text>
      </View>
      {days.map((day, index) => {
        const fill = normalizedProgress >= 0 ? index < normalizedProgress : index < 7;
        return (
            <View key={day} style={styles.dayContainer}>
              <Text style={styles.dayText}>{day}</Text>
              <View style={styles.dayCircleContainer}>
                <View style={[
                  styles.dayCircle,
                  fill ? styles.filledDay : styles.emptyDay
                ]}>
                  {index !== days.length - 1 && ( // Change here to not render line on the last day
                      <View style={[
                        styles.line,
                        { left: 4 }, // Change line position to the right
                        fill ? styles.filledDay : styles.emptyDay
                      ]}/>
                  )}
                </View>
              </View>
            </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: screenWidth,
    padding: 8,
    marginTop: -18
  },
  circle: {
    width: 80,
    height:  80,
    borderRadius: 50,
    backgroundColor: INCORRECT_ANSWER,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 11,
    borderColor: MAIN_SECOND,
    bottom: 10,
  },
  dayContainer: {
    alignItems: 'center',
    flexDirection: 'column', // Элементы располагаются вертикально
    zIndex: 10,
  },
  dayCircleContainer: {
    position: 'relative', // Для абсолютного позиционирования линии
  },
  dayCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginTop: 3,
  },
  filledDay: {
    backgroundColor: INCORRECT_ANSWER,
    zIndex: 2,
  },
  emptyDay: {
    backgroundColor: BLOCK_BUTTON,
  },
  dayText: {
    fontSize: 12,
    fontFamily: Quicksand_Regular,
    color: BLACK,
    marginBottom: 5,
  },
  line: {
    position: 'absolute',
    height: 4,
    width: 47,
    backgroundColor: BLACK,
    top: '34%',
    zIndex: 1,
  },
});

export default WeeklyProgressBar;
