import cat from "./cat1.png";
import dog from "./berta.png";
import dj from "./djuzi.png";

interface RunnerData {
  src: string;
  offsetX?: number;
  offsetY?: number;
}

const RunnerSelection = {
  cat: {
    src: cat,
  } as RunnerData,
  dog: {
    src: dog,
  } as RunnerData,
  dj: {
    src: dj,
    offsetY: -12,
  } as RunnerData,
};

export type RunnerId = keyof (typeof RunnerSelection);

interface RunnerIconProps {
  key: RunnerId;
}

const RunnerIcon = (props: RunnerIconProps) => {
  const runner = () => RunnerSelection[props.key];

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
  runner: RunnerId;
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
