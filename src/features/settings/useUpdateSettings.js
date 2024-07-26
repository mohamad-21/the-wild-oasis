import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting } from "../../services/apiSettings";
import toast from "react-hot-toast";

export function useUpdateSettings() {
  const queryClient = useQueryClient();
  const { mutate: updateSettings, isPending } = useMutation({
    mutationFn: updateSetting,
    onSuccess: () => {
      toast.success('setting updated');
      queryClient.invalidateQueries({ queryKey: ['settings'] });
    },
    onError: () => {
      toast.error('there is an error. setting could not updated');
    }
  })

  return { updateSettings, isPending };
}