import cat1 from './cat1.png';
import {createMemo, createEffect} from 'solid-js';

const TRACK_RADIUS = 48;

export interface RunningTrackProps{
	workTime: number;
	restTime: number;
	curTime: number;
}

const RunningTrack = (props: RunningTrackProps) => {
	
	const totalTime = () => props.workTime + props.restTime;
	
	const curTimeInMinutes = () => ((props.curTime / 1000) / 60) % totalTime();

	const segmentCoords = () => computeSegments(totalTime(), props.workTime, props.restTime);	
	const svgPaths = () => createPaths(segmentCoords());

	const catPosX = () => Math.sin(2*Math.PI * (curTimeInMinutes() / totalTime())) * TRACK_RADIUS;
	const catPosY = () => -Math.cos(2*Math.PI * (curTimeInMinutes() / totalTime())) * TRACK_RADIUS;

	const currentSection = () => curTimeInMinutes() <= props.workTime;
	
	const currentTimeLeftInSection = () => {
		const currentSegmentTime = currentSection() ? props.workTime : props.restTime;
		const currentSegmentAnchor = currentSection() ? 0 : props.workTime;
		
		const timeLeft = (currentSegmentTime - curTimeInMinutes() + currentSegmentAnchor);
	
		const minutesLeft = ~~timeLeft;

		const secondsLeft = ~~((timeLeft - minutesLeft) * 60)

		return `${minutesLeft.toString().padStart(2, '0')}:${secondsLeft.toString().padStart(2, '0')}`;
	}

	const wobble = () => {
		return (Math.PI) * Math.sin(curTimeInMinutes() * 600);
	}

	return (
		<div class="track">
		<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="auto" viewBox="0 0 120 120">
			<g transform="translate(60,60)">
				<For each={svgPaths()}>
					{(coord, i) => coord }
				</For>
				<circle cx="0" cy="0" r="40" fill="white" stroke="white" stroke-width="0"/>
				<g transform={`translate(${catPosX()},${catPosY()})`}>	
					<g transform={`rotate(${wobble()})`}>	
						<image x={-10} y={-15} width="20" height="20" href={cat1}/>
					</g>
				</g>
				<text class={currentSection() ? "trackTimerWork" : "trackTimerRest"} dy="0.25em" text-anchor="middle">{currentTimeLeftInSection()}</text>
			</g>
		</svg>
		</div>
	)
}

const createPaths = (paths: {sx: number, sy: number, ex: number, ey: number}[]) => {
	
	const arr = [];
	for (const c of paths){
		const str = `M0 0 ${c.sx} ${c.sy} A${TRACK_RADIUS} ${TRACK_RADIUS} 0 0 1 ${c.ex} ${c.ey} z`;

		arr.push(<g class={c.isWorkTime ? "workTimeSegment" : "restTimeSegment"}>
			 <g fill="none" stroke-width="0">
			 <path d={str}/>
			 </g>

		</g>);
	}
	return arr;
}

const computeSegments = (totalTime: number, workTime: number, restTime: number) => {
		
	const arr = [];

	const createSegment = (startRad: number, endRad: number, isWorkTime: boolean) => {
		if (endRad - startRad > Math.PI){
			createSegment(startRad, startRad + Math.PI, isWorkTime);
			createSegment(startRad + Math.PI, endRad, isWorkTime);
			return;
		}

		const sx = Math.sin(startRad)*TRACK_RADIUS;
		const sy = -Math.cos(startRad)*TRACK_RADIUS;
		const ex = Math.sin(endRad)*TRACK_RADIUS;
		const ey = -Math.cos(endRad)*TRACK_RADIUS;

		arr.push({
			sx,
			sy,
			ex,
			ey,
			isWorkTime
		})
	}

	const startRad = 0;
	const workTimeRad = 2*Math.PI * (workTime / totalTime);
	const restTimeRad = 2*Math.PI * (restTime / totalTime) + workTimeRad;
	
	console.log(totalTime, workTime, restTime);
	console.log(startRad, workTimeRad, restTimeRad);

	createSegment(startRad, workTimeRad, true);
	createSegment(workTimeRad, restTimeRad, false);

	return arr;
}

const computeHighestDivider = (value: number) => {
	
	let segments = value / 10;

	for (let i = 12; i > 10; i--){
		const divided = value / i;
		if (divided === Math.trunc(divided))
			return divided;
	}

	return segments;
}

export default RunningTrack;
