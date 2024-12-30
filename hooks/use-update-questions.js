import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "./use-toast";

export const useUpdateQuestions = () => {
  return useMutation({
    mutationFn: async ({ id, questions }) => {
      const response = await axios.patch(`/api/question/${id}`, { questions });

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
