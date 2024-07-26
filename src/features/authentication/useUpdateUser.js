import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserAccount } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate: updateUser, isPending } = useMutation({
    mutationFn: updateUserAccount,
    onSuccess: ({ user }) => {
      toast.success('Your Account successfully updated');
      queryClient.setQueryData(['user'], user);
    },
    onError: (err) => {
      console.log(err)
      toast.error(err.message);
    }
  })
  return { updateUser, isPending };
}