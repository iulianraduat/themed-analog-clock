# themed-analog-clock ![Weekly downloads](https://img.shields.io/npm/dw/themed-analog-clock 'Weekly downloads')

An analog clock with a dark and a light theme

---

## Demo

You can access the storybook for this component [here](https://iulian-radu-at.github.io/themed-analog-clock/).

## Props

The component accepts the props defined bellow in the table.

### Props accepted by ThemedAnalogClock

| Name         | Type             | Required | Default            | Description                                                             |
| ------------ | ---------------- | -------- | ------------------ | ----------------------------------------------------------------------- |
| date         | Date             | no       | undefined          | Force the clock to start displaying the time with the time of this date |
| description  | string           | no       | undefined          | The text displayed bellow the clock                                     |
| size         | number \| string | no       | 100%               | The size of the clock                                                   |
| style        | CSSProperties    | no       | {}                 | The style for root element (overwrite any internal style)               |
| timezoneName | string           | no       | browser's timezone | The timezone for which is displayed teh time (if date is not set)       |
| useDarkTheme | boolean          | no       | false              | Define which theme is used (light or dark)                              |

Note: date is thought to be used only for testing and in storybook.

---

## Versions

| ThemedAnalogClock _uses_ |      React       |
| -----------------------: | :--------------: |
|                    1.0.x |      16.8.6      |
|                    2.0.x |      16.8.6      |
|                    2.1.x |      16.9.0      |
|                    2.2.x | 16.9.0 or 17.0.0 |
|                    3.0.x |     >=18.0.0     |

### About versioning schema used for ThemedAnalogClock

- Major - it will be increased if the major version of the dependat package changes or there are breaking changes in the code of ThemedAnalogClock
- Minor - it will be increased if no major version of the dependat package changes, but there are changes of the minor or patch versions of it
- Patch - it will be increased if there are no changes of the dependat packages, but there are non breaking changes in the code of ThemedAnalogClock

---

## Example

Displaying an analog clock in a dark theme:

```js
import * as React from 'react';
import ThemedAnalogClock from 'themed-analog-clock';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <ThemedAnalogClock
          description="The time now in New York"
          timezoneName="America/New_York"
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

### 1.0.1

- Fixed the bug related to displaying in dark mode the text outside of the dark background

### 2.0.0

- Breaking change: renamed prop title to description

### 2.0.1

- Added a prop style to style the root element (use it to customize the look of the current theme)

### 2.0.2

- Fixed the name of some svg elements

### 2.1.0

- Upgraded packages

### 2.1.1

- Updated packages
- Moved from npm to yarn

### 2.1.2

- Updated packages

### 2.1.3

- Updated packages

### 2.1.4

- Fixed crash produced by "export \* from"

### 2.2.0

- Accepting React 17 as peerDependencies
- Fixed security warnings

### 2.2.1

- Updated the packages

### 3.0.0

- Supports minimum React 18

### 3.0.1

- Updated the packages
