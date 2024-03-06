import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Svg, Circle, Text as SvgText } from 'react-native-svg';

const WeeklyProgressBar = ({ total, progress }) => {
  const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

  // Create a style for each day based on the progress
  const dailyProgressStyles = progress.map((completed) =>
    completed ? styles.filledDay : styles.emptyDay
  );

  return (
    <View style={styles.container}>
      <Svg height="60" width="60" style={styles.circle}>
        <Circle cx="30" cy="30" r="29" fill="white" stroke="black" strokeWidth="0.5"/>
        <SvgText
          x="30"
          y="35"
          textAnchor="middle"
          fill="black"
          fontSize="20"
          fontWeight="bold"
        >
          {total}
        </SvgText>
      </Svg>
      <View style={styles.progressBar}>
        {days.map((day, index) => (
          <View key={day} style={[styles.day, dailyProgressStyles[index]]}>
            <Text style={styles.dayText}>{day}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circle: {
    marginRight: 8,
  },
  progressBar: {
    flexDirection: 'row',
    flex: 1,
    height: 20,
    backgroundColor: '#E0E0E0',
    borderRadius: 10,
  },
  day: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 2,
    borderRadius: 5,
  },
  filledDay: {
    backgroundColor: '#6200EE',
  },
  emptyDay: {
    backgroundColor: 'transparent',
  },
  dayText: {
    fontSize: 12,
  }
});

export default WeeklyProgressBar;
