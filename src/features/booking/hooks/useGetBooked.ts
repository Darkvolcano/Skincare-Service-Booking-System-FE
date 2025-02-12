import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BookingDto } from "../dto/booking.dto";

const fetchBookings = async (): Promise<BookingDto[]> => {
  const response = await axios.get<BookingDto[]>(
    "https://6670d16d0900b5f8724babe3.mockapi.io/api/v1/studentManagement"
  );
  return response.data;
};

export const useBookings = () => {
  return useQuery<BookingDto[], Error>({
    queryKey: ["studentManagement"],
    queryFn: fetchBookings,
  });
};
