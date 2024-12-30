import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export const useGetQuestions = (id) => {
  return useQuery({
    queryKey: ["questions", id],
    queryFn: async () => {
      try {
        const response = await axios.get(`/api/question/${id}`);

        return response.data;
      } catch (error) {
        throw new Error("Failed to fetch questions");
      }
    },
    enabled: !!id,
  });
};
