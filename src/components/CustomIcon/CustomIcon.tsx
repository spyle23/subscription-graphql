import { FC } from "react";

type CustomIconProps = {
  children: JSX.Element;
  id: string;
  color1: string;
  color2: string;
  type: "linear" | "radial";
};

export const CustomIcon: FC<CustomIconProps> = ({
  children,
  color1,
  id,
  type,
  color2,
}) => {
  return (
    <>
      <svg width={0} height={0}>
        {type === "linear" ? (
          <linearGradient id={id} x1={1} y1={0} x2={1} y2={1}>
            <stop offset={0} stopColor={color1} />
            <stop offset={1} stopColor={color2} />
          </linearGradient>
        ) : (
          <radialGradient id={id} x1={1} y1={0} x2={1} y2={1}>
            <stop offset={0} stopColor={color1} />
            <stop offset={1} stopColor={color2} />
          </radialGradient>
        )}
      </svg>
      {children}
    </>
  );
};
