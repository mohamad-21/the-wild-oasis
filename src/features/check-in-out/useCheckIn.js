import { QueryCache, useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckIn() {

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkIn, isPending: isPendingCheckin } = useMutation({
    mutationFn: ({ id, ...props }) => updateBooking(id, {
      status: 'checked-in',
      isPaid: true,
      ...props
    }),
    onSuccess: (data) => {
      toast.success(`Booking #${data?.id} successfully checked in`);
      queryClient.invalidateQueries();
      navigate('/');
    },
    onError: (err) => {
      toast.error(`there is an error`)
      console.log(err.message);
    },
  })

  return { checkIn, isPendingCheckin }
}