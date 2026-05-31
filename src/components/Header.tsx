import { IconStopwatch } from "./icons.tsx";

export interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => {
  return (
    <div class="header">
      <h1>
        <IconStopwatch size="2em" /> {title} <IconStopwatch size="2em" />
      </h1>
    </div>
  );
};

export default Header;
