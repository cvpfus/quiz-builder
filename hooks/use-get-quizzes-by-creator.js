import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetQuizzesByCreator = (creatorId) => {
  return useQuery({
    queryKey: ["quizzes", creatorId],
    queryFn: async () => {
      try {
        const response = await axios.get(`/api/quiz?creatorId=${creatorId}`);

        return response.data;
      } catch (error) {
        throw new Error(error.response.data.error);
      }
    },
    enabled: !!creatorId,
  });
};
