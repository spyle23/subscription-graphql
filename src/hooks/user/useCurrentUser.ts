import { useQuery } from "@apollo/client";
import { PROFILE, Profile, ProfileVariables } from "../../graphql/user";

export const useCurrentUser = (id: number) => {
  const { data } = useQuery<Profile, ProfileVariables>(PROFILE, {
    variables: { userId: id },
    skip: !id,
  });
  return {
    data,
  };
};
