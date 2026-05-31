import { createMemo, For } from "solid-js";
import Runner, { RunnerId } from "./runner.tsx";
import { Show } from "solid-js/web";
import { IconPlayerPause, IconPlayerPlay, IconRefreshAlert } from "./icons.tsx";

const TRACK_RADIUS = 48;

export interface RunningTrackProps {
  workTime: number;
  restTime: number;
  curTime: number;
  runner: RunnerId;

  timerIsRunning: boolean;
  setTimerIsRunning: (started: boolean) => void;

  resetTimer: () => void;
}

interface SegmentCoord {
  sx: number;
  sy: number;
  ex: number;
  ey: number;
  isWorkTime: boolean;
}

const RunningTrack = (props: RunningTrackProps) => {
  const totalTime = () => props.workTime + props.restTime;

  const curTimeInMinutes = createMemo(() =>
    ((props.curTime / 1000) / 60) % totalTime()
  );

  const segmentCoords = () =>
    computeSegments(totalTime(), props.workTime, props.restTime);
  const svgPaths = createMemo(() => createPaths(segmentCoords()));

  const catPosX = () =>
    Math.sin(2 * Math.PI * (curTimeInMinutes() / totalTime())) * TRACK_RADIUS;
  const catPosY = () =>
    -Math.cos(2 * Math.PI * (curTimeInMinutes() / totalTime())) * TRACK_RADIUS;

  const currentSection = () => curTimeInMinutes() <= props.workTime;

  const currentTimeLeftInSection = () => {
    const currentSegmentTime = currentSection()
      ? props.workTime
      : props.restTime;
    const currentSegmentAnchor = currentSection() ? 0 : props.workTime;

    const timeLeft = currentSegmentTime - curTimeInMinutes() +
      currentSegmentAnchor;

    const minutesLeft = ~~timeLeft;

    const secondsLeft = ~~((timeLeft - minutesLeft) * 60);

    return `${minutesLeft.toString().padStart(2, "0")}:${
      secondsLeft.toString().padStart(2, "0")
    }`;
  };

  const wobble = () => {
    return (Math.PI) * Math.sin(props.curTime / 100);
  };

  return (
    <div class="track">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 110"
      >
        <g transform="translate(50,60)">
          <For each={svgPaths()}>
            {(coord, _) => coord}
          </For>
          <circle
            cx="0"
            cy="0"
            r="40"
            fill="white"
            stroke="white"
            stroke-width="0"
          />
          <Runner
            positionX={catPosX()}
            positionY={catPosY()}
            rotation={wobble()}
            runner={props.runner}
          />
          <text
            class={currentSection() ? "trackTimerWork" : "trackTimerRest"}
            dy="0.25em"
            text-anchor="middle"
          >
            {currentTimeLeftInSection()}
          </text>
          <g transform="translate(-10,8)">
            <Show when={!props.timerIsRunning}>
              <IconPlayerPlay
                size={10}
                color="#6ec59f"
              />
              <rect
                width={10}
                height={10}
                fill="transparent"
                cursor="pointer"
                onclick={() => props.setTimerIsRunning(true)}
              />
            </Show>
            <Show when={props.timerIsRunning}>
              <IconPlayerPause
                size={10}
                color="#6ec59f"
              />
              <rect
                width={10}
                height={10}
                fill="transparent"
                cursor="pointer"
                onclick={() => props.setTimerIsRunning(false)}
              />
            </Show>
            <g transform="translate(10,0)">
              <IconRefreshAlert size={10} color="#6ec59f" />
              <rect
                width={10}
                height={10}
                fill="transparent"
                cursor="pointer"
                onclick={props.resetTimer}
              />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
};

const createPaths = (
  paths: {
    sx: number;
    sy: number;
    ex: number;
    ey: number;
    isWorkTime: boolean;
  }[],
) => {
  const arr = [];
  for (const c of paths) {
    const str =
      `M0 0 ${c.sx} ${c.sy} A${TRACK_RADIUS} ${TRACK_RADIUS} 0 0 1 ${c.ex} ${c.ey} z`;

    arr.push(
      <g class={c.isWorkTime ? "workTimeSegment" : "restTimeSegment"}>
        <g fill="none" stroke-width="0">
          <path d={str} />
        </g>
      </g>,
    );
  }
  return arr;
};

const computeSegments = (
  totalTime: number,
  workTime: number,
  restTime: number,
) => {
  const arr: SegmentCoord[] = [];

  const createSegment = (
    startRad: number,
    endRad: number,
    isWorkTime: boolean,
  ) => {
    if (endRad - startRad > Math.PI) {
      createSegment(startRad, startRad + Math.PI, isWorkTime);
      createSegment(startRad + Math.PI, endRad, isWorkTime);
      return;
    }

    const sx = Math.sin(startRad) * TRACK_RADIUS;
    const sy = -Math.cos(startRad) * TRACK_RADIUS;
    const ex = Math.sin(endRad) * TRACK_RADIUS;
    const ey = -Math.cos(endRad) * TRACK_RADIUS;

    arr.push({
      sx,
      sy,
      ex,
      ey,
      isWorkTime,
    });
  };

  const startRad = 0;
  const workTimeRad = 2 * Math.PI * (workTime / totalTime);
  const restTimeRad = 2 * Math.PI * (restTime / totalTime) + workTimeRad;

  console.log(totalTime, workTime, restTime);
  console.log(startRad, workTimeRad, restTimeRad);

  createSegment(startRad, workTimeRad, true);
  createSegment(workTimeRad, restTimeRad, false);

  return arr;
};

export default RunningTrack;
