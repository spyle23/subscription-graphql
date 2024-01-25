import React, { FC } from "react";
import { motion } from "framer-motion";
type WrittingProps = {
  dotColor: string;
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export const Writting: FC<WrittingProps> = ({ dotColor, style, ...props }) => {
  return (
    <motion.div
      style={{
        backgroundColor: "lightgray",
        borderRadius: "20px",
        display: "flex",
        padding: "8px",
        ...style,
      }}
    >
      <motion.div
        style={{
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          background: dotColor,
          marginRight: "4px",
        }}
        animate={{
          scale: [1, 1.5, 1], // Animation for the dot to appear like a typing animation
        }}
        transition={{
          repeat: Infinity,
          duration: 0.5,
        }}
      />
      <motion.div
        style={{
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          background: dotColor,
          marginRight: "4px",
        }}
        animate={{
          scale: [1, 1.5, 1], // Animation for the dot to appear like a typing animation
        }}
        transition={{
          repeat: Infinity,
          duration: 0.5,
        }}
      />
      <motion.div
        style={{
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          background: dotColor,
          marginRight: "4px",
        }}
        animate={{
          scale: [1, 1.5, 1], // Animation for the dot to appear like a typing animation
        }}
        transition={{
          repeat: Infinity,
          duration: 0.5,
        }}
      />
    </motion.div>
  );
};
