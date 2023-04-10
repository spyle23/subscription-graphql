import { IReactions } from "../types/IReactions";
import Angry from "../assets/angry.svg";
import Laughing from "../assets/laughing.svg";
import Like from "../assets/like.svg";
import Sad from "../assets/sad.svg";
import Soaked from "../assets/soaked.svg";
import Love from "../assets/love.svg";
import { ReactionType } from "../types/graphql-types";

export const reactions: IReactions[] = [
  {
    url: Like,
    value: ReactionType.LIKE,
  },
  {
    url: Love,
    value: ReactionType.LOVE,
  },
  {
    url: Laughing,
    value: ReactionType.HAHA,
  },
  {
    url: Sad,
    value: ReactionType.SAD
  },
  {
    url: Soaked,
    value: ReactionType.WOAHOU,
  },
  {
    url: Angry,
    value: ReactionType.GRR,
  }
];
