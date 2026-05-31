import {
  createEffect,
  createSignal, // @ts-types="solid-js"
  For, // @ts-types="solid-js"
  // @ts-types="solid-js"
  onMount,
} from "solid-js";
import { RunnerId } from "./runner.tsx";

export interface ConfigurationProps {
  workTime: number;
  setWorkTime: (wt: number) => void;

  restTime: number;
  setRestTime: (rt: number) => void;

  timerRunning: boolean;
  setTimerRunning: (running: boolean) => void;

  runner: RunnerId;
  setRunner: (runner: RunnerId) => void;

  resetTimer: () => void;
}

const Configuration = (props: ConfigurationProps) => {
  const toggleTimer = () => {
    const prev = props.timerRunning;
    props.setTimerRunning(!prev);
  };

  const workTimeInputCb = (e: Event) => {
    props.setWorkTime(
      Number((e.currentTarget as HTMLInputElement)?.value ?? 0),
    );
  };

  const restTimeInputCb = (e: Event) => {
    props.setRestTime(
      Number((e.currentTarget as HTMLInputElement)?.value ?? 0),
    );
  };

  const runnerSelectedCb = (e: Event) => {
    props.setRunner(
      (e.currentTarget as HTMLInputElement)?.value as RunnerId ?? "cat",
    );
  };
  const runnerOptions: [string, RunnerId][] = [
    ["Pus", "cat"],
    ["Hund", "dog"],
    ["Dj Uzzi", "dj"],
  ];

  return (
    <div>
      <div>
        <button type="button" onClick={toggleTimer}>
          {!props.timerRunning ? "Start" : "Stop"} timer
        </button>
        <button type="button" onClick={props.resetTimer}>
          Reset timer
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
        <select value={props.runner} name="runner" onChange={runnerSelectedCb}>
          <For each={runnerOptions}>
            {([name, id], i) => <option value={id}>{name}</option>}
          </For>
        </select>
      </div>
    </div>
  );
};

export default Configuration;
