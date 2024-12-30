import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "./use-toast";

export const useUpdateQuiz = () => {
  return useMutation({
    mutationFn: async ({ id, title }) => {
      const response = await axios.patch(`/api/quiz/${id}`, { id, title });

      if (response.data.error) {
        throw new Error(response.data.error);
      }

      return response.data;
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};
