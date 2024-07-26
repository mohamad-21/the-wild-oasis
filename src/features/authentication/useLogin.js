import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from '../../services/apiAuth';
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: login, isPending } = useMutation({
    mutationFn: ({ email, password }) => loginApi(email, password),
    onSuccess: (data) => {
      toast.success('Welcome Back!');
      queryClient.setQueryData(['user'], data.user);
      navigate('/');
    },
    onError: () => toast.error('email or password is incorrect')
  })

  return { login, isPending };
}