import { Card, CardProps, styled } from "@mui/material";
import { FC } from "react";

const StyledCard = styled(Card)({
  width: "100%",
  padding: 2
});

type CustomCardProps = CardProps & {
  children: React.ReactNode;
};

export const CustomCard: FC<CustomCardProps> = ({ children, ...props }) => {
  return <StyledCard {...props}>{children}</StyledCard>;
};
