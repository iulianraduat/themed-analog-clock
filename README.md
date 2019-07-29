# themed-analog-clock

An analog clock with a dark and a light theme

---

## Demo

You can access the storybook for this component [here](https://iulian-radu-at.github.io/themed-analog-clock/).

## Props

The component accepts the props defined bellow in the table.

### Props accepted by ThemedAnalogClock

| Name         | Type     | Required | Default            | Description                                                             |
|--------------|----------|----------|--------------------|-------------------------------------------------------------------------|
| date         | Date     | no       | undefined          | Force the clock to start displaying the time with the time of this date |
| size         | number \| string   | no                 | 384|The size of the clock                                               |
| timezoneName | string   | no       | browser's timezone | The timezone for which is displayed teh time (if date is not set)       |
| title        | string   | no       | undefined          | The text displayed bellow the clock                                     |
| useDarkTheme | boolean  | no       | false              | Define which theme is used (light or dark)                              |

Note: date is thought to be used only for testing and in storybook.

---

## Versions

| ThemedAnalogClock _uses_ | React  |
|-------------------------:|:------:|
|                    1.0.x | 16.8.6 |

### About versioning schema used for ThemedAnalogClock

- Major - it will be increased if the major version of the dependat package changes or there are breaking changes in the code of ThemedAnalogClock
- Minor - it will be increased if no major version of the dependat package changes, but there are changes of the minor or patch versions of it
- Patch - it will be increased if there are no changes of the dependat packages, but there are non breaking changes in the code of ThemedAnalogClock

---

## Example

Displaying an analog clock in a dark theme:

```js
import * as React from "react";
import ThemedAnalogClock from "themed-analog-clock";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <ThemedAnalogClock
            title='The time now in New York'
            timezoneName='America/New_York'
            useDarkTheme={true}
        />
      </div>
    );
  }
}

export default App;
```

---

## Changelog

### 1.0.0

- themed-analog-clock is made publicly available
