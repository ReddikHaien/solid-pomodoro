import abk from "./ABK.png";
import berta from "./berta.png";
import bibelen from "./bibelen.png";
import cat from "./cat1.png";
import coolGuy from "./cool-guy.png";
import djuzi from "./djuzi.png";
import exam from "./eksamens-relevant.png";
import goodJob from "./Godt-jobbet.png";
import gu from "./gu.png";
import hip from "./hofte.png";
import soonDone from "./Snart-ferdig.png";

export interface ImageStyling {
  src: string;
  offsetX?: number;
  offsetY?: number;
}

export interface ImageRegistry {
  [key: string]: ImageStyling;
}

const registry = {
  abk: {
    src: abk,
    offsetY: -11,
  },
  berta: {
    src: berta,
  },
  bibelen: {
    src: bibelen,
  },
  cat: {
    src: cat,
  },
  coolGuy: {
    src: coolGuy,
  },
  djuzi: {
    src: djuzi,
    offsetY: -12,
  },
  exam: {
    src: exam,
  },
  goodJob: {
    src: goodJob,
  },
  gu: {
    src: gu,
  },
  hip: {
    src: hip,
  },
  soonDone: {
    src: soonDone,
  },
} satisfies Record<string, ImageStyling>;

export type Images = keyof typeof registry;

export const Registry: Record<string, ImageStyling> = registry;
