
import logo from "../assets/money_wings.svg";

type LogoProps = {
  showIcon?: boolean;
  showText?: boolean;
  text?: string;
  color?: string;
  size?: number;
  background?: string;
  padding?: string;
  margin?: string;
  rounded?: string;
};

export default function Logo({
  showIcon = true,
  showText = true,
  text = "Wallet-app",
  color = "#2FC18C",
  size = 32,
  background,
  padding = "0",
  margin = "0",
  rounded = "0",
}: LogoProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        color,
        background,
        padding,
        margin,
        borderRadius: rounded,
        fontSize: `${size}px`,
        fontWeight: 600,
      }}
    >
      {showIcon && <img src={logo} alt="logo" width={size} height={size} />}
      {showText && <span>{text}</span>}
    </div>
  );
}
