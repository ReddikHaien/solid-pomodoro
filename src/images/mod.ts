import abk from "./ABK.png";
import berta from "./berta.png";
import bibelen from "./bibelen.png";
import cat from "./cat1.png";
import djuzi from "./djuzi.png";
import goodJob from "./Godt-jobbet.png";
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
  djuzi: {
    src: djuzi,
    offsetY: -12,
  },
  goodJob: {
    src: goodJob,
  },
  soonDone: {
    src: soonDone,
  },
} satisfies Record<string, ImageStyling>;

export type Images = keyof typeof registry;

export { registry as Registry };
