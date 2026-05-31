// @ts-types="solid-js"
import { JSX } from "solid-js";

export interface ButtonProps {
  onClick?: (e: Event) => void;
  children?: JSX.Element;
  class?: string;
  type?: "button";
}

const Button = (props: ButtonProps) => {
  const classes = "default-btn " + props.class;
  return <button {...props} class={classes} />;
};

export default Button;
