import { Images, Registry } from "../images/mod.ts";

interface RunnerIconProps {
  key: Images;
}

const RunnerIcon = (props: RunnerIconProps) => {
  const runner = () => Registry[props.key];

  return (
    <image
      x={runner().offsetX ?? -10}
      y={runner().offsetY ?? -15}
      width="20"
      height="20"
      href={runner().src}
    />
  );
};

export interface RunnerProps {
  runner: Images;
  rotation: number;
  positionX: number;
  positionY: number;
}

const Runner = (props: RunnerProps) => (
  <g transform={`translate(${props.positionX},${props.positionY})`}>
    <g transform={`rotate(${props.rotation})`}>
      <RunnerIcon key={props.runner} />
    </g>
  </g>
);

export default Runner;
