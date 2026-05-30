import {createSignal, createEffect} from 'solid-js';


export interface ConfigurationProps{
	onWorkTimeChanged?: (number) => void;
	onRestTimeChanged?: (number) => void;
	onTimerStateChange?: (boolean) => void;
	onTimerReset?: () => void;
	onTimerSkip?: () => void;
}


const Configuration = (props: ConfigurationProps) => {
	const [workTime, setWorkTime] = createSignal(25);
	const [restTime, setRestTime] = createSignal(5);
	const [timerStarted, setTimerStarted] = createSignal(false);

	createEffect(() => {
		if (props.onWorkTimeChanged)
			props.onWorkTimeChanged(workTime());
	});

	createEffect(() => {
		if (props.onRestTimeChanged)
			props.onRestTimeChanged(restTime());
	})

	createEffect(() => {
		if (props.onTimerStateChange)
			props.onTimerStateChange(timerStarted());
	})

	const toggleTimer = () => {
		const prev = timerStarted();
		setTimerStarted(!prev);
	}
	
	const workTimeInputCb = (e) => {
		setWorkTime(e.currentTarget.value);
	}

	const restTimeInputCb = (e) => {
		setRestTime(e.currentTarget.value);
	}

	return (
		
		<div>
			<div>
				<span>WorkTime: <input type="number" onInput={workTimeInputCb}/> </span>
				<span>RestTime: <input type="number" onInput={restTimeInputCb}/></span>
			</div>
			<div>
				<button onClick={toggleTimer}>{!timerStarted() ? "Start" : "Stop"} timer</button>
			</div>
		</div>
	);
};


export default Configuration;
