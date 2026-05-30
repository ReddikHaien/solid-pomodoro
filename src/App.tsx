import './App.scss';

import { Component, createSignal, onCleanup, createEffect } from 'solid-js';
import Counter from './Counter';
import Header from './components/Header';
import Configuration from './components/configuration';
import RunningTrack  from './components/running-track';
import createLoop from './utils/schedule';

const App: Component = () => {	
	const [time, setTime] = createSignal(0);
	const [workTime, setWorkTime] = createSignal(10);
	const [restTime, setRestTime] = createSignal(10);
	const [timerStarted, setTimerStarted] = createSignal(false)
	const [timerPaused, setTimerPaused] = createSignal(false)

	
	const incrementTimer = (amount: number) => {
		setTime(time() + amount);
	}
	
	const disposeTimer = createLoop({
		callback: (delta) => incrementTimer(delta),
		shouldLoop: () => true,
		isPaused: () => !timerStarted() || timerPaused()
	})

	onCleanup(disposeTimer)
	

	const workTimeCb = (v: string) => {
		setWorkTime(Number(v));
	}

	const restTimeCb = (v: string) => {
		setRestTime(Number(v))
	}

	const resetTimerCb = () => {
		setTime(0)
	}

	const toggleTimerCb = (start: boolean) => {
		if (start && !timerStarted()){
			setTimerStarted(start);
		}
		setTimerPaused(!start);		
	}

  return (
    <>
      <div class="main">
      	<Header title="Pusens Pomodoro"/>
	<Configuration
		onWorkTimeChanged={workTimeCb}
		onRestTimeChanged={restTimeCb}
		onTimerStateChange={toggleTimerCb}
		onTimerReset={resetTimerCb}
	/>
	<RunningTrack workTime={workTime()} restTime={restTime()} curTime={time()}/>
      </div>
    </>
  );
};

export default App;

