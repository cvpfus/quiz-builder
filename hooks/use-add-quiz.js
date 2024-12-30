import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "./use-toast";

export function useAddQuiz() {
  return useMutation({
    mutationFn: async ({ title }) => {
      const response = await axios.post("/api/quiz", {
        title,
      });

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
}
