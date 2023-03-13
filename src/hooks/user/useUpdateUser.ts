import { useEffect } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_INFO } from "../../graphql/user";
import {
  UpdateUser,
  UpdateUserVariables,
} from "../../graphql/user/types/UpdateUser";
import { UpdateUserInput } from "../../types/graphql-types";
import { useApplicationContext } from "../application";

export const useUpdateUser = () => {
  const { user, dispatchSnack } = useApplicationContext();
  const [updateExec, { error }] = useMutation<UpdateUser, UpdateUserVariables>(
    UPDATE_INFO
  );

  const updateUser = async (data: UpdateUserInput) => {
    const message = await updateExec({
      variables: { userId: user?.id as number, updateUserInput: data },
    });
    dispatchSnack({
      open: true,
      severity: "success",
      message: message?.data?.updateUser,
    });
  };

  useEffect(() => {
    if (error?.message) {
      dispatchSnack({
        open: true,
        severity: "error",
        message: error?.message,
      });
    }
  }, [error]);

  return {
    updateUser,
  };
};
