import React, { useState } from "react";
import "./tooltip.css";

type TooltipProps = {
  text: string;
  position?: "top" | "right" | "bottom" | "left";
  children: React.ReactNode;
}

export function Tooltip({
  text,
  position = "top",
  children,
}:TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  const showTooltip = () => setIsVisible(true);
  const hideTooltip = () => setIsVisible(false);

  return (
    <div
      className="tooltip-container"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
    >
      {children}
      {isVisible && (
        <div className={`tooltip-box bg-white tx-black tooltip-${position}`}>{text}</div>
      )}
    </div>
  );
};
