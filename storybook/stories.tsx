import * as React from 'react';
import ThemedAnalogClock from '../src/ThemedAnalogClock';
import { storiesOf } from '@storybook/react';

const style: React.CSSProperties = {
  height: '95vh',
  width: '95vw'
};

storiesOf('ThemedAnalogClock', module)
  .add('using the light theme', () => {
    return (
      <div style={style}>
        <ThemedAnalogClock title="light theme" useDarkTheme={false} />
      </div>
    );
  })
  .add('using the dark theme', () => {
    return (
      <div style={style}>
        <ThemedAnalogClock title="dark theme" useDarkTheme={true} />
      </div>
    );
  })
  .add('without a title', () => (
    <div style={style}>
      <ThemedAnalogClock />
    </div>
  ))
  .add('with a specified size', () => (
    <div style={style}>
      <ThemedAnalogClock size={100} title="The width and height is 100px" />
    </div>
  ))
  .add('with a title using a placeholder for used timezone', () => (
    <div style={style}>
      <ThemedAnalogClock title='The time in timezone "{}"' />
    </div>
  ))
  .add("using the browser's timezone", () => (
    <div style={style}>
      <ThemedAnalogClock title="Your browser's time ({})" />
    </div>
  ))
  .add('using a specified timezone', () => {
    return (
      <div style={style}>
        <ThemedAnalogClock timezoneName={'America/New_York'} title={'The time now in New York'} />
      </div>
    );
  })
  .add('change AM to PM at noon', () => (
    <div style={style}>
      <ThemedAnalogClock title="Change AM to PM at noon" date={new Date(2019, 6, 1, 11, 59, 58)} />
    </div>
  ))
  .add('change PM to AM at midnight', () => (
    <div style={style}>
      <ThemedAnalogClock title="Change PM to AM at midnight" date={new Date(2019, 6, 1, 23, 59, 58)} />
    </div>
  ));
