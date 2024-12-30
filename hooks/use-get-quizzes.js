import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetQuizzes = () => {
  return useQuery({
    queryKey: ["quizzes"],
    queryFn: async () => {
      try {
        const response = await axios.get("/api/quiz");

        return response.data;
      } catch (error) {
        throw new Error(error.response.data.error);
      }
    },
  });
};
