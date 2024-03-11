import React, { useEffect, useState } from 'react';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import {StyleSheet, Text} from "react-native";
import {BACKGROUND, BLACK, BLOCK_BUTTON, MAIN_SECOND, SECONDARY_SECOND} from "../../colors";
import {Quicksand_Regular} from "../../fonts";

const CircularTimer = ({ seconds, initialSeconds = 15, isActive = true }: any) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (!isActive) return;

    const newProgress = seconds / initialSeconds * 100;
    setProgress(newProgress);
  }, [seconds, initialSeconds, isActive]);

  return (
    <AnimatedCircularProgress
      size={105}
      width={25}
      fill={progress}
      tintColor={MAIN_SECOND}
      onAnimationComplete={() => console.log('onAnimationComplete')}
      backgroundColor={BLOCK_BUTTON}>
      {
        (fill) => (
          <Text style={styles.number}>
            {seconds > 0 ? seconds : 0}
          </Text>
        )
      }
    </AnimatedCircularProgress>
  );
};

const styles = StyleSheet.create({
  number: {
    fontFamily: Quicksand_Regular,
    color: BLACK,
    fontSize: 24,
    marginBottom: 5,
  }
})

export default CircularTimer;