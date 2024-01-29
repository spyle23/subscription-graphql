import { useQuery } from "@apollo/client";
import { PROFILE, Profile, ProfileVariables } from "../../graphql/user";

export const useCurrentUser = (profilId?: number, viewerId?: number) => {
  const { data, refetch, loading } = useQuery<Profile, ProfileVariables>(
    PROFILE,
    {
      variables: { profilId: profilId as number, viewerId: viewerId as number },
      skip: !profilId || !viewerId,
    }
  );
  return {
    data: data?.profile,
    loading,
    refetch,
  };
};
