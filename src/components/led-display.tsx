import c from "classnames";
import { useTheme } from "contexts/use-theme";

import "../assets/css/led-display.css";

type Props = {
  color: "blue" | "red" | "yellow";
};

export function LedDisplay({ color }: Props) {
  const { theme, setTheme } = useTheme();
  const isActive = theme === color;

  return (
    <div
      className={c(
        "led-display",
        `led-${color}`,
        isActive && "led-display--active"
      )}
      onClick={() => setTheme(color)}
    ></div>
  );
}
