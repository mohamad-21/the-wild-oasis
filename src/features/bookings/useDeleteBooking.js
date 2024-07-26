import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useDeleteBooking() {
  const queryClient = useQueryClient();
  const { mutate: deleteBooking, isPending: isDeletingBooking, isSuccess } = useMutation({
    mutationFn: (id) => deleteBookingApi(id),
    onSuccess: (data) => {
      toast.success(`Booking #${data?.id} successfully deleted`);
      queryClient.invalidateQueries();
    },
    onError: (err) => {
      toast.error('there is en error');
      console.log(err.message);
    }
  })

  return { deleteBooking, isDeletingBooking, isSuccess };
}