import * as React from 'react';

const styles: { [key: string]: Theme } = {
  darkTheme: {
    backgroundColor: '#222222',
    handColor: '#00ff7f',
    tickColor: '#7fffd4'
  },
  lightTheme: {
    backgroundColor: '#ffffff',
    handColor: '#000000',
    tickColor: '#444444'
  }
};

interface Theme {
  backgroundColor: string;
  handColor: string;
  tickColor: string;
}

const AnalogClock = ({
  hours,
  displayAm,
  height = '100%',
  minutes,
  seconds,
  useDarkTheme,
  width = '100%'
}: RenderAnalogClockProps): JSX.Element => {
  const imgEl = React.useRef<SVGSVGElement>(null);
  const [isTimeSet, setTimeSet] = React.useState(false);

  const setInitialHandPosition = React.useCallback(() => {
    const svgEl = imgEl.current;
    if (svgEl === null) {
      React.useEffect(() => {
        setInitialHandPosition();
      });
      return;
    }

    const roundTo6deg = (deg: number) => {
      return Math.floor(deg / 6) * 6;
    };

    const secondsDeg = roundTo6deg(360 * (seconds / 60));
    const minutesDeg = 360 * ((minutes * 60 + seconds) / 3600);
    const hoursDeg = 360 * ((hours * 3600 + minutes * 60 + seconds) / 43200);

    svgEl.querySelector('.iconic-clock-second-hand')!.setAttribute('transform', `rotate(${secondsDeg},192,192)`);
    svgEl.querySelector('.iconic-clock-minute-hand')!.setAttribute('transform', `rotate(${minutesDeg},192,192)`);
    svgEl.querySelector('.iconic-clock-hour-hand')!.setAttribute('transform', `rotate(${hoursDeg},192,192)`);

    setTimeSet(true);
  }, [hours, minutes, seconds]);

  React.useEffect(() => {
    setInitialHandPosition();
  }, []);

  const theme: Theme = useDarkTheme ? styles.darkTheme : styles.lightTheme;

  const renderTicks = () => {
    const color = theme.tickColor;
    let ticks = [];
    for (let i = 0; i < 60; i++) {
      if (i % 15 === 0) {
        ticks.push(
          <line
            x1="125"
            y1="0"
            x2="175"
            y2="0"
            strokeWidth="9"
            stroke={color}
            style={{ transform: `rotate(${6 * i}deg)` }}
          />
        );
      } else if (i % 5 === 0) {
        ticks.push(
          <line
            x1="145"
            y1="0"
            x2="175"
            y2="0"
            strokeWidth="6"
            stroke={color}
            style={{ transform: `rotate(${6 * i}deg)` }}
          />
        );
      } else {
        ticks.push(
          <line
            x1="174"
            y1="0"
            x2="175"
            y2="0"
            strokeWidth="3"
            stroke={color}
            style={{ transform: `rotate(${6 * i}deg)` }}
          />
        );
      }
    }
    return ticks;
  };

  const stepsHand = () => {
    let steps = [];
    for (let i = 0; i < 60; i++) {
      steps.push(`${i * 6} 192 192`);
    }
    return steps.join(';');
  };

  return (
    <svg
      ref={imgEl}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x={0}
      y={0}
      viewBox="0 0 384 384"
      preserveAspectRatio="xMidYMid meet"
      strokeWidth={1}
      strokeLinecap="round"
      style={{
        display: isTimeSet ? 'inline-block' : 'none',
        overflow: 'hidden',
        width,
        height
      }}
    >
      <g id="iconic-clock-frame">
        <circle r="190" cx="192" cy="192" stroke="#444444" strokeWidth="2" fill={theme.backgroundColor} />
        <text
          x="192"
          y="220"
          fill={theme.handColor}
          dominantBaseline="middle"
          textAnchor="middle"
          fontFamily="monospace"
          fontSize="120%"
        >
          {displayAm ? 'AM' : 'PM'}
        </text>
      </g>
      <g id="iconic-clock-ticks" transform="translate(192, 192)">
        {renderTicks()}
      </g>
      <line
        className="iconic-clock-hour-hand"
        id="iconic-anim-clock-hour-hand"
        fill="none"
        stroke={theme.handColor}
        strokeWidth="10"
        strokeMiterlimit="5"
        x1="192"
        y1="192"
        x2="192"
        y2="87.5"
      />
      <line
        className="iconic-clock-minute-hand"
        id="iconic-anim-clock-minute-hand"
        fill="none"
        stroke={theme.handColor}
        strokeWidth="6"
        strokeMiterlimit="5"
        x1="192"
        y1="192"
        x2="192"
        y2="54"
      />
      <circle className="iconic-clock-axis" cx="192" cy="192" r="9" stroke={theme.handColor} />
      <g className="iconic-clock-second-hand" id="iconic-anim-clock-second-hand">
        <line
          className="iconic-clock-second-hand-arm"
          x1="192"
          y1="192"
          x2="192"
          y2="28.5"
          fill="none"
          stroke="#D53A1F"
          strokeWidth="4"
          strokeMiterlimit="10"
        />
        <circle
          className="iconic-clock-second-hand-axis"
          cx="192"
          cy="192"
          r="4.5"
          fill="#D53A1F"
          stroke={theme.handColor}
        />
      </g>
      <defs>
        <animateTransform
          attributeName="transform"
          attributeType="xml"
          xlinkHref="#iconic-anim-clock-hour-hand"
          type="rotate"
          dur="43200s"
          from="0 192 192"
          to="360 192 192"
          fill="remove"
          restart="always"
          calcMode="linear"
          accumulate="none"
          additive="sum"
          repeatCount="indefinite"
        />
        <animateTransform
          attributeName="transform"
          attributeType="xml"
          xlinkHref="#iconic-anim-clock-minute-hand"
          type="rotate"
          dur="3600s"
          from="0 192 192"
          to="360 192 192"
          fill="remove"
          restart="always"
          accumulate="none"
          additive="sum"
          repeatCount="indefinite"
        />
        <animateTransform
          attributeName="transform"
          attributeType="xml"
          xlinkHref="#iconic-anim-clock-second-hand"
          type="rotate"
          dur="60s"
          from="0 192 192"
          to="360 192 192"
          calcMode="discrete"
          values={stepsHand()}
          fill="remove"
          restart="always"
          accumulate="none"
          additive="sum"
          repeatCount="indefinite"
        />
      </defs>
    </svg>
  );
};

interface RenderAnalogClockProps {
  hours: number;
  displayAm: boolean;
  height?: number | string;
  minutes: number;
  seconds: number;
  useDarkTheme: boolean;
  width?: number | string;
}

export default AnalogClock;
