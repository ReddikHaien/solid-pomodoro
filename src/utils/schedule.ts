

export interface ScheduleProps{
	callback: (delta: number) => void;
	shouldLoop: () => boolean;
	isPaused:() => boolean;
}

const createLoop = (props: ScheduleProps) => {
	let tickId;

	let prevTime = new Date();

	const work = () => {
		const curTime = new Date();
		const delta = curTime - prevTime;
		prevTime = curTime;
		if (props.shouldLoop()) tick();
		if (!props.isPaused()) props.callback(delta);
	}

	const tick = () => {
		tickId = requestAnimationFrame(work);
	}

	const dispose = () => {
		cancelAnimationFrame(tickId);
	}

	tick();

	return dispose;
}

export default createLoop;
