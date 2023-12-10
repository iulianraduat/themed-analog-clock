import { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import ThemedAnalogClock from '../src/ThemedAnalogClock';

const style: React.CSSProperties = {
  height: '95vh',
  width: '95vw',
};

const meta: Meta<typeof ThemedAnalogClock> = {
  title: 'ThemedAnalogClock',
  component: ThemedAnalogClock,
} as Meta<typeof ThemedAnalogClock>;
export default meta;
type Story = StoryObj<typeof ThemedAnalogClock>;

export const UsingTheLightTheme = () => (
  <div style={style}>
    <ThemedAnalogClock description="light theme" useDarkTheme={false} />
  </div>
);

export const UsingTheDarkTheme = () => (
  <div style={style}>
    <ThemedAnalogClock description="dark theme" useDarkTheme={true} />
  </div>
);

export const WithoutADescription = () => (
  <div style={style}>
    <ThemedAnalogClock />
  </div>
);

export const WithASpecifiedSize = () => (
  <div style={style}>
    <ThemedAnalogClock size={100} description="The width and height is 100px" />
  </div>
);

export const WithADescriptionUsingAPlaceholderForUsedTimezone = () => (
  <div style={style}>
    <ThemedAnalogClock description='The time in timezone "{}"' />
  </div>
);

export const UsingTheBrowserTimezone = () => (
  <div style={style}>
    <ThemedAnalogClock description="Your browser's time ({})" />
  </div>
);

export const UsingASpecifiedTimezone = () => (
  <div style={style}>
    <ThemedAnalogClock
      timezoneName={'America/New_York'}
      description={'The time now in New York'}
    />
  </div>
);

export const ChangeAaToPmAtNoon = () => (
  <div style={style}>
    <ThemedAnalogClock
      description="Change AM to PM at noon"
      date={new Date(2019, 6, 1, 11, 59, 58)}
    />
  </div>
);
ChangeAaToPmAtNoon.storyName = 'change AM to PM at noon';

export const ChangePmToAmAtMidnight = () => (
  <div style={style}>
    <ThemedAnalogClock
      description="Change PM to AM at midnight"
      date={new Date(2019, 6, 1, 23, 59, 58)}
    />
  </div>
);
ChangePmToAmAtMidnight.storyName = 'change PM to AM at midnight';
