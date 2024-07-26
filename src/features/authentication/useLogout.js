import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/apiAuth";

export function useLogout() {
  const queryClient = useQueryClient();
  const { mutate: logout, isPending: isLoggingOut } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => queryClient.invalidateQueries()
  });

  return { logout, isLoggingOut };
}