import React, { FC, useState } from "react";
import { motion } from "framer-motion";
import { ReactionType } from "../../types/graphql-types";
import { IReactions } from "../../types/IReactions";
import { reactions } from "../../constants/reactions";

type FBReactionsProps = {
  btnClicked: boolean;
  onClick: (value: IReactions) => Promise<void>;
};

export const FBReactions: FC<FBReactionsProps> = ({
  btnClicked,
  onClick,
}): JSX.Element => {

  const list = {
    visible: {
      opacity: 1,
      transition: {
        when: "afterChildren",
        staggerChildren: 0.2,
      },
    },
    hidden: {
      opacity: 0,
      transition: {
        when: "beforeChildren",
      },
      scale: 0.6,
    },
  };

  const handleReact = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    const url = (e.target as any).src as string;
    const type = (e.target as any).alt as ReactionType;
    onClick({ url, value: type });
  };

  return (
    <motion.div className="parentDiv">
      <motion.div
        className="reactionsHolder"
        variants={list}
        animate={btnClicked ? "visible" : "hidden"}
      >
        {reactions.map((value, index) => (
          <motion.img
            key={index}
            whileHover={{ scale: 1.5 }}
            src={value.url}
            alt={value.value}
            width="40"
            onClick={handleReact}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};
