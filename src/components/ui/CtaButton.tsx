import { useState } from "react";
import { Link } from "react-router-dom";

interface CtaButtonProps {
  title: string;
  route: string;
  font?: string;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  onMouseEnterColor?: string;
  onMouseEnterBorderColor?: string;
  onMouseEnterBackgroundColor?: string;
}

export default function CtaButton({
  title,
  route,
  font = "",
  backgroundColor,
  textColor,
  borderColor,
  onMouseEnterColor,
  onMouseEnterBorderColor,
  onMouseEnterBackgroundColor,
}: CtaButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      to={route}
      className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl text-[14px] ${font} transition-all duration-200`}
      style={{
        color: isHovered ? onMouseEnterColor || textColor : textColor,
        backgroundColor: isHovered
          ? onMouseEnterBackgroundColor || backgroundColor
          : backgroundColor,
        border: `1px solid ${isHovered ? onMouseEnterBorderColor || borderColor : borderColor}`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {title}
    </Link>
  );
}
