import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
  const { mutate: signup, isPending } = useMutation({
    mutationFn: signupApi,
    onSuccess: () => {
      toast.success('Your new account successfully created. please verify your email to activate your account')
    },
    onError: (err) => {
      console.log(err.message);
      toast.error('Signup was not successfull. please try again later')
    }
  })

  return { signup, isPending };
}