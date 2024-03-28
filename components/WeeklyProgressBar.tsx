import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import {BLACK, BLOCK_BUTTON, INCORRECT_ANSWER, MAIN_SECOND, RED, WHITE} from "../colors";
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
        {/*<FireIcon size={100} style={{ overflow: 'hidden', position: 'absolute', left: 1, }} />*/}
        <Text style={{ fontFamily: 'Quicksand_Bold', fontSize: 24, color: INCORRECT_ANSWER, fontWeight: 'bold' }}>{total}</Text>
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
                {index !== 0 && (
                  <View style={[
                    styles.line,
                    { left: -38 },
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
    justifyContent: 'space-around', // Обеспечивает равномерное распределение по ширине экрана
    width: screenWidth,
    padding: 10,
  },
  circle: {
    width: 80,
    height:  80,
    borderRadius: 50,
    backgroundColor: WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 11,
    borderColor: MAIN_SECOND,
    bottom: 10,
  },
  dayContainer: {
    alignItems: 'center',
    flexDirection: 'column', // Элементы располагаются вертикально
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
