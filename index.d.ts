import * as React from 'react';

export interface ThemedAnalogClockProps extends React.Props<ThemedAnalogClock> {
  date?: Date;
  size?: number | string;
  timezoneName?: string;
  title?: string;
  useDarkTheme?: boolean;
}

declare class ThemedAnalogClock extends React.Component<ThemedAnalogClockProps> {}

declare module 'themed-analog-clock' {}

export default ThemedAnalogClock;
