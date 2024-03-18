import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import {BLACK, BLOCK_BUTTON, MAIN_SECOND, RED, WHITE} from "../colors";
import {Quicksand_Bold, Quicksand_Regular} from "../fonts";
import FireIcon from "./icons/FireIcon";

const screenWidth = Dimensions.get('window').width;

const WeeklyProgressBar = ({ total, progress }: any) => {
  const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

  return (
    <View style={styles.container}>
      <View style={styles.circle}>
        <Text style={{fontFamily: Quicksand_Bold, color: BLACK, fontSize: 16}}>100</Text>
      </View>
      {days.map((day, index) => (
        <View key={day} style={styles.dayContainer}>
          <Text style={styles.dayText}>{day}</Text>
          <View style={styles.dayCircleContainer}>
            <View style={[styles.dayCircle, progress[index] ? styles.filledDay : styles.emptyDay]}>
              {index !== 0 && <View style={[styles.line, {left: -42}, progress[index] ? styles.filledDay : styles.emptyDay]}></View>}
            </View>
          </View>
        </View>
      ))}
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
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 10,
    borderColor: MAIN_SECOND,
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
    marginTop: 5,
  },
  filledDay: {
    backgroundColor: '#6200EE',
    zIndex: 2,
  },
  emptyDay: {
    backgroundColor: BLOCK_BUTTON,
  },
  dayText: {
    fontSize: 12,
    fontFamily: Quicksand_Regular,
    color: BLACK,
    marginBottom: 5, // Отступ для разделения текста и круга
  },
  line: {
    position: 'absolute',
    height: 4,
    width: 50,
    backgroundColor: BLACK,
    top: '34%',
    zIndex: 1,
  },
});

export default WeeklyProgressBar;
