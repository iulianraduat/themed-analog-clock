import moment from 'moment-timezone';
import React from 'react';
import AnalogClock from './AnalogClock';

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    height: '100%',
    width: '100%',
    textAlign: 'center',
  },
  darkTheme: {
    backgroundColor: '#222222',
    color: '#7fffd4',
  },
  lightTheme: {
    backgroundColor: '#ffffff',
    color: '#000000',
  },
};

const getTheme = (
  useDarkTheme: boolean,
  style: React.CSSProperties = {}
): React.CSSProperties => ({
  ...styles.container,
  ...(useDarkTheme ? styles.darkTheme : styles.lightTheme),
  ...style,
});

let timeoutCall: NodeJS.Timeout | undefined = undefined;

const ThemedAnalogClock = ({
  date,
  description,
  size,
  style,
  timezoneName,
  useDarkTheme,
}: ThemedAnalogClockProps): JSX.Element => {
  const [resolvedTimezoneName, hours, minutes, seconds, isAm] =
    React.useMemo(() => {
      const resolvedTimezoneName = timezoneName
        ? timezoneName
        : Intl.DateTimeFormat().resolvedOptions().timeZone;

      const dateInTimezone = moment().tz(resolvedTimezoneName);
      const hours = date ? date.getHours() : dateInTimezone.get('hours') % 12;
      const minutes = date ? date.getMinutes() : dateInTimezone.get('minutes');
      const seconds = date ? date.getSeconds() : dateInTimezone.get('seconds');
      const isAm = (date ? date.getHours() : dateInTimezone.get('hours')) < 12;

      return [resolvedTimezoneName, hours, minutes, seconds, isAm];
    }, [date, timezoneName]);
  const [displayAm, setDisplayAm] = React.useState<boolean>(isAm);

  const atEach12 = React.useCallback(() => {
    const now = date ? date : new Date();
    const start: Date = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      now.getHours() < 12 ? 12 : 24,
      0,
      0,
      0
    );

    const wait = start.getTime() - now.getTime();
    if (wait <= 0) {
      /* Missed before going into the setTimeout */
      atEach12();
      return;
    }

    if (timeoutCall) {
      clearTimeout(timeoutCall);
    }
    timeoutCall = setTimeout(() => {
      const h = date
        ? (date.getHours() + Math.ceil(wait / 3600000)) % 24
        : new Date().getHours();
      setDisplayAm(h < 12);
      atEach12();
    }, wait);
  }, [date]);

  React.useEffect(() => {
    setDisplayAm(isAm);
    atEach12();

    return () => {
      if (timeoutCall) {
        clearTimeout(timeoutCall);
      }
    };
  }, [atEach12, isAm]);

  useDarkTheme = useDarkTheme === true;
  description = description
    ? description.replace('{}', resolvedTimezoneName)
    : undefined;

  return (
    <div style={getTheme(useDarkTheme, style)}>
      <AnalogClock
        hours={hours}
        minutes={minutes}
        seconds={seconds}
        displayAm={displayAm}
        useDarkTheme={useDarkTheme}
        width={size}
        height={getHeight(size, description !== undefined)}
      />
      <div>{description}</div>
    </div>
  );
};

const getHeight = (
  size: number | string | undefined,
  hasDescription: boolean
): number | string | undefined => {
  if (size === undefined) {
    if (hasDescription === false) {
      return undefined;
    }

    return `calc(100% - 1.3em)`;
  }

  if (hasDescription === false) {
    return size;
  }

  if (typeof size === 'number') {
    return `calc(${size}px - 1.3em)`;
  }

  return `calc(${size} - 1.3em)`;
};

export interface ThemedAnalogClockProps {
  date?: Date;
  description?: string;
  size?: number | string;
  style?: React.CSSProperties;
  timezoneName?: string;
  useDarkTheme?: boolean;
}

export default ThemedAnalogClock;
