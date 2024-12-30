import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetResult = ({ id, userAnswers }) => {
  return useQuery({
    queryKey: ["result", id],
    queryFn: async () => {
      try {
        const response = await axios.post(`/api/result/${id}`, {
          userAnswers,
        });

        return response.data;
      } catch (error) {
        throw new Error(error.response.data.error);
      }
    },
  });
};
