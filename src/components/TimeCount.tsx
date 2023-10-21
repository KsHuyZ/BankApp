import {Text} from 'react-native';
import React, {useEffect, useState} from 'react';
interface TimeCountProps {
  refresh: boolean;
  setRefresh: () => void;
}
const initialTime = 3 * 60 * 1000;
const TimeCount = ({refresh, setRefresh}: TimeCountProps) => {
  const [countdownTime, setCountdownTime] = useState<number>(initialTime);

  useEffect(() => {
    if (countdownTime === 0) {
      return;
    }
    const interval = setInterval(() => {
      setCountdownTime(countdownTime - 1000);
    }, 1000);

    return () => clearInterval(interval);
  }, [countdownTime]);

  useEffect(() => {
    if (refresh) {
      setCountdownTime(initialTime);
      setRefresh();
    }
  }, [refresh]);
  const minutes = Math.floor((countdownTime % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countdownTime % (1000 * 60)) / 1000);

  return (
    <Text>
      0{minutes}:{seconds.toString().length < 2 ? `0${seconds}` : seconds}
    </Text>
  );
};

export default TimeCount;
