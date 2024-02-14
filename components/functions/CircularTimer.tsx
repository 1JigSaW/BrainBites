import React, { useEffect, useState } from 'react';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import {Text} from "react-native";

const CircularTimer = ({ seconds, initialSeconds = 15 }: any) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    // Рассчитываем прогресс исходя из текущего значения seconds
    const newProgress = seconds / 15 * 100;
    setProgress(newProgress);
  }, [seconds, initialSeconds]);

  return (
    <AnimatedCircularProgress
      size={30}
      width={3}
      fill={progress}
      tintColor="#00e0ff"
      onAnimationComplete={() => console.log('onAnimationComplete')}
      backgroundColor="#3d5875">
      {
        (fill) => (
          <Text>
            {seconds > 0 ? seconds : 0}
          </Text>
        )
      }
    </AnimatedCircularProgress>
  );
};

export default CircularTimer;