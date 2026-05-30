import {Dynamic} from "solid-js/web";

interface SvgProps{
	strokeWidth?: number;
}


const StopWatchSvg = (props: SvgProps = {strokeWidth:2}) => {
	return <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={props.strokeWidth} d="M5 13a7 7 0 1 0 14 0a7 7 0 0 0-14 0m9.5-2.5L12 13m5-5l1-1m-4-4h-4"></path>

}

const SpriteData = {
	"stop-watch": StopWatchSvg
}

export interface IconProps extends Partial<SvgProps>{
	content: keyof SpriteData;
	size?: string | number
}

const Icon = (props: IconProps) => {

	const size = props.size ?? "1em";
	const data = SpriteData[props.content];
	console.log(data);
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24">
		<Dynamic component={data} {...props}/>
		</svg>
	)
}

export default Icon;
