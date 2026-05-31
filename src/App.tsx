import "./App.scss";

import {
  Component,
  createEffect, // @ts-types="solid-js"
  createMemo,
  createSignal,
  onCleanup,
} from "solid-js";
import Header from "./components/Header.tsx";
import Configuration from "./components/configuration.tsx";
import RunningTrack from "./components/running-track.tsx";
import createLoop from "./utils/schedule.ts";
import ContentPanel from "./components/ContentPanel.tsx";
import { RunnerId } from "./components/runner.tsx";

const App: Component = () => {
  const [time, setTime] = createSignal(0);
  const [workTime, setWorkTime] = createSignal(10);
  const [restTime, setRestTime] = createSignal(10);
  const [runner, setRunner] = createSignal("cat" as RunnerId);
  const [timerStarted, setTimerStarted] = createSignal(false);
  const [timerPaused, setTimerPaused] = createSignal(false);

  const curDate = createMemo(() => {
    const d = new Date();
    return `${d.getFullYear().toString().padStart(4, "0")}${
      d.getMonth().toString().padStart(2, "0")
    }${d.getDay().toString().padStart(2, "0")}`;
  });

  const incrementTimer = (amount: number) => {
    setTime(time() + amount);
  };

  const timerIsRunning = () => timerStarted() && !timerPaused();

  const disposeTimer = createLoop({
    callback: (delta) => incrementTimer(delta),
    shouldLoop: () => true,
    isPaused: () => !timerIsRunning(),
  });

  onCleanup(disposeTimer);

  const resetTimerCb = () => {
    setTimerStarted(false);
    setTimerPaused(false);
    setTime(0);
  };

  const toggleTimerCb = (start: boolean) => {
    if (start && !timerStarted()) {
      setTimerStarted(start);
    }
    setTimerPaused(!start);
  };

  return (
    <>
      <div class="main">
        <Header title={`Pusens Pomodoro`} />
        <ContentPanel
          sidepanel={
            <Configuration
              runner={runner()}
              setRunner={setRunner}
              workTime={workTime()}
              setWorkTime={setWorkTime}
              restTime={restTime()}
              setRestTime={setRestTime}
            />
          }
        >
          <RunningTrack
            workTime={workTime()}
            restTime={restTime()}
            curTime={time()}
            runner={runner()}
            timerIsRunning={timerIsRunning()}
            setTimerIsRunning={toggleTimerCb}
            resetTimer={resetTimerCb}
          />
        </ContentPanel>
      </div>
    </>
  );
};

export default App;
