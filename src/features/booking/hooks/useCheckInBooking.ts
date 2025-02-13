import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const API_BASE_URL = "https://localhost:7071/api/Booking/checkin";

interface MutationVariables {
  BookingId: number;
}

export const useCheckInBooking = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, MutationVariables>({
    mutationFn: async ({ BookingId }: MutationVariables): Promise<void> => {
      await axios.put(`${API_BASE_URL}/${BookingId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["checkin"] });
    },
  });
};
