import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { UpdateBookingDto } from "../dto/update-booking.dto";

const API_BASE_URL =
  "https://6670d16d0900b5f8724babe3.mockapi.io/api/v1/studentManagement";

interface MutationVariables {
  BookingId: string;
  data: UpdateBookingDto;
}

export const useCheckOutBooking = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, MutationVariables>({
    mutationFn: async ({
      BookingId,
      data,
    }: MutationVariables): Promise<void> => {
      await axios.put(`${API_BASE_URL}/${BookingId}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["studentManagement"] });
    },
  });
};
