import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export const useGetQuiz = (id) => {
  return useQuery({
    queryKey: ["quiz", id],
    queryFn: async () => {
      try {
        const response = await axios.get(`/api/quiz/${id}`);
        return response.data;
      } catch (error) {
        throw new Error("Failed to fetch questions");
      }
    },
    enabled: !!id,
  });
};
