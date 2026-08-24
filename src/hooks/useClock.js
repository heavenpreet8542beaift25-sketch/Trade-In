import { useEffect, useState } from 'react';

// Ticks once a second and returns the current IST time as a display string.
export function useClock() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const format = () =>
      new Date().toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'Asia/Kolkata'
      });

    setTime(format());
    const timer = setInterval(() => setTime(format()), 1000);
    return () => clearInterval(timer);
  }, []);

  return time;
}
