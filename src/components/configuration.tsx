import {
  createEffect,
  createSignal, // @ts-types="solid-js"
  For,
} from "solid-js";
import { RunnerId } from "./runner.tsx";

export interface ConfigurationProps {
  onWorkTimeChanged?: (wt: number) => void;
  onRestTimeChanged?: (rt: number) => void;
  onTimerStateChange?: (started: boolean) => void;
  onTimerReset?: () => void;
  onTimerSkip?: () => void;
  onRunnerChange?: (runner: RunnerId) => void;
}

const Configuration = (props: ConfigurationProps) => {
  const [workTime, setWorkTime] = createSignal(25);
  const [restTime, setRestTime] = createSignal(5);
  const [timerStarted, setTimerStarted] = createSignal(false);
  const [runner, setRunner] = createSignal("cat" as RunnerId);

  createEffect(() => {
    if (props.onWorkTimeChanged) {
      props.onWorkTimeChanged(workTime());
    }
  });

  createEffect(() => {
    if (props.onRestTimeChanged) {
      props.onRestTimeChanged(restTime());
    }
  });

  createEffect(() => {
    if (props.onTimerStateChange) {
      props.onTimerStateChange(timerStarted());
    }
  });

  createEffect(() => {
    if (props.onRunnerChange) {
      props.onRunnerChange(runner());
    }
  });

  const toggleTimer = () => {
    const prev = timerStarted();
    setTimerStarted(!prev);
  };

  const workTimeInputCb = (e: Event) => {
    setWorkTime(Number((e.currentTarget as HTMLInputElement)?.value ?? 0));
  };

  const restTimeInputCb = (e: Event) => {
    setRestTime(Number((e.currentTarget as HTMLInputElement)?.value ?? 0));
  };

  const runnerSelectedCb = (e: Event) => {
    setRunner(
      (e.currentTarget as HTMLInputElement)?.value as RunnerId ?? "cat",
    );
  };
  const runnerOptions: [string, RunnerId][] = [
    ["Pus", "cat"],
    ["Hund", "dog"],
    ["Dj Uzi", "dj"],
  ];

  return (
    <div>
      <div>
        <button onClick={toggleTimer}>
          {!timerStarted() ? "Start" : "Stop"} timer
        </button>
      </div>
      <div>
        <span>
          WorkTime: <input type="number" onInput={workTimeInputCb} />
        </span>
        <span>
          RestTime: <input type="number" onInput={restTimeInputCb} />
        </span>
      </div>
      <div>
        <label for="runner">Choose your runner</label>
        <select value={runner()} name="runner" onChange={runnerSelectedCb}>
          <For each={runnerOptions}>
            {([name, id], i) => <option value={id}>{name}</option>}
          </For>
        </select>
      </div>
    </div>
  );
};

export default Configuration;
