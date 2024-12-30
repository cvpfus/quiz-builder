import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "./use-toast";

export const useUpdateAnswers = () => {
  return useMutation({
    mutationFn: async ({ answers }) => {
      const response = await axios.patch("/api/answer", { answers });

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
