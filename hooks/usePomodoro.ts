
import { useState, useEffect, useCallback, useRef } from 'react';

type PomodoroMode = 'work' | 'shortBreak' | 'longBreak';

const TIMES: Record<PomodoroMode, number> = {
  work: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 15 * 60,
};

export const usePomodoro = () => {
  const [mode, setMode] = useState<PomodoroMode>('work');
  const [timeLeft, setTimeLeft] = useState(TIMES[mode]);
  const [isActive, setIsActive] = useState(false);
  const [cycles, setCycles] = useState(0);

  const intervalRef = useRef<number | null>(null);

  const stopTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsActive(false);
  }, []);

  const startTimer = useCallback(() => {
    if (intervalRef.current) return;
    setIsActive(true);
    intervalRef.current = window.setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
  }, []);

  const resetTimer = useCallback((newMode: PomodoroMode) => {
    stopTimer();
    setMode(newMode);
    setTimeLeft(TIMES[newMode]);
  }, [stopTimer]);
  
  const handleNextMode = useCallback(() => {
    stopTimer();
    if (mode === 'work') {
      const newCycles = cycles + 1;
      setCycles(newCycles);
      if (newCycles % 4 === 0) {
        setMode('longBreak');
        setTimeLeft(TIMES.longBreak);
      } else {
        setMode('shortBreak');
        setTimeLeft(TIMES.shortBreak);
      }
    } else {
      setMode('work');
      setTimeLeft(TIMES.work);
    }
  }, [cycles, mode, stopTimer]);


  useEffect(() => {
    if (timeLeft <= 0) {
      handleNextMode();
    }
  }, [timeLeft, handleNextMode]);

  useEffect(() => {
    return () => stopTimer();
  }, [stopTimer]);

  const toggleTimer = () => {
    if (isActive) {
      stopTimer();
    } else {
      startTimer();
    }
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return {
    minutes,
    seconds,
    isActive,
    mode,
    cycles,
    toggleTimer,
    resetTimer,
    handleNextMode,
  };
};
