import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCheckout() {
  const queryClient = useQueryClient();
  const { mutate: checkout, isPending: isCheckingOut } = useMutation({
    mutationFn: (id) => updateBooking(id, {
      status: 'checked-out'
    }),
    onSuccess: (data) => {
      toast.success(`Booking #${data?.id} successfully checked out`)
      queryClient.invalidateQueries();
    },
    onError: (data) => {
      toast.error('there is an error');
      console.log(data.message);
    }
  });

  return { checkout, isCheckingOut }
}